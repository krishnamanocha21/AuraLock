import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js" // 1. Import User Model (Required to find user)

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        // 2. Get the token (Your code was correct here)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        // 3. Verify the token (Missing in your code)
        // We must pass the Secret Key to check if the token is real.
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        // 4. Find the User (Crucial Step)
        // We use the ID inside the token to find the actual user in the DB.
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            // Token is valid technically, but user might have been deleted from DB
            throw new ApiError(401, "Invalid Access Token")
        }

        // 5. Attach User to Request
        // This is how 'req.user' becomes available in your controllers later!
        req.user = user;
        
        // 6. Pass the baton
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})