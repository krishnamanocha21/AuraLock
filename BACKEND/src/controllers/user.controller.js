import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";


const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        
        // Use methods defined in user.models.js
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // Save Refresh Token in DB (allows us to force logout later if needed)
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        //by  this we meant that validation like password required or minlength that we have write while making a model
        //unless whenever you save the schema every validation will be check again

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    
    // 1. Get data from frontend
    const { fullName, email, password } = req.body

    // 2. Validation: Ensure no fields are empty
    if (
        [fullName, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // 3. Check if user already exists
    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "User with this email already exists")
    }

    // 4. Create the User (Password hashing happens automatically in Model)
    const user = await User.create({
        fullName,
        email,
        password
    })

    // 5. Check creation & select user without sensitive info
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // 6. Send Success Response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
} )

const loginUser = asyncHandler( async (req, res) => {
    
    // 1. Get data
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }

    // 2. Find User
    const user = await User.findOne({ email })
    
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    // 3. Check Password (using custom method from Model)
    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // 4. Generate Tokens
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    // 5. Fetch user again without password/refresh token for the response
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    // 6. Set Secure Cookies
    const options = {
        httpOnly: true, // Prevents client-side JS from reading the cookie
    /* creating a error on postman */
       secure: true    // Ensures cookies are sent only over HTTPS
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    
    // 1. Update User in DB: Remove the refresh token
    // (We know req.user exists because 'verifyJWT' middleware runs before this)
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // Removes the field entirely
            }
        },
        {
            new: true
        }
    )

    // 2. Clear Cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


export { 
    registerUser, 
    loginUser, 
    logoutUser 
}