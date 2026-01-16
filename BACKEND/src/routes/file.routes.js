import { Router } from "express";
import { 
    uploadFile, 
    getUserUploadHistory 
} from "../controllers/file.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

// All routes in this file should be secured
router.use(verifyJWT) 

// 1. Upload Route
// 'upload.single("file")' processes the file from the form data
router.route("/upload").post(
    upload.single("file"), 
    uploadFile
)

// 2. History Route
// Fetches the list of files for the "My Upload History" UI
router.route("/history").get(getUserUploadHistory)

export default router