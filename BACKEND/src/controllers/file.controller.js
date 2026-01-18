import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { File } from "../models/file.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const uploadFile = asyncHandler(async (req, res) => {
    
    
    const { title, description, category, password } = req.body

    if (!title || !description || !category) {
        throw new ApiError(400, "All fields are required")
    }

    // 2. Get the file path from Multer (req.file)
    // "file" is the name of the input field in the frontend
    const localFilePath = req.file?.path
    //the file field name is used because of the multer input field


    if (!localFilePath) {
        throw new ApiError(400, "File is missing")
    }

    
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath)

    if (!cloudinaryResponse) {
        throw new ApiError(500, "Failed to upload file to cloud")
    }

    
    const file = await File.create({
        fileUrl: cloudinaryResponse.url,
        publicId: cloudinaryResponse.public_id, // CRITICAL for deletion later
        title,
        description,
        category,
        password: password || null, // Optional
        fileType: cloudinaryResponse.format, 
        size: cloudinaryResponse.bytes, 
        owner: req.user._id // Linked to the logged-in user
        //because of the verifyjwt token and we have passed this function in the fileroute before the upload option 
        //  using the auth middlewarre
        //(file.controller.js): By the time the code reaches here, req.user is already ready. You can just use it directly.
    })

    return res.status(201).json(
        new ApiResponse(200, file, "File uploaded successfully")
    )
})

const getUserUploadHistory = asyncHandler(async (req, res) => {
    //in the 5 point of the verify of the jwt token i have saved user in the user field
    const userId = req.user._id;

    const files = await File.find({ owner: userId })
        .sort({ createdAt: -1 })
        //-1 for descending and 1 for ascending
        .populate("owner", "fullName email"); 
        //It replaces an "ID" with the actual "Data
        // in the file scehma the field name is owner
        /*It fetches the data: It looks up the user stored in the owner field.
          It filters the data: It tells Mongoose, "Only give me their fullName and email. Do not give me anything else (like their password, phone number, or address)." */

    return res
        .status(200)
        .json(
            new ApiResponse(200, files, "Upload history fetched successfully")
        );
});

export { uploadFile,
    getUserUploadHistory

}

// algorithm
/*
1. Get text data from the form
2. Get the file path from Multer (req.file)
"file" is the name of the input field in the frontend form
3. Upload to Cloudinary
4. Create Database Record
*/