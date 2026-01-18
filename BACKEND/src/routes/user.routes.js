import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken,
    getCurrentUser,
    updateUserRole
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

// Public Routes (No login required)

//for the problem of reading the form data pass the upload middleware also
//// This tells Multer: "Read the form fields (Name, Email), but expect NO files."
router.route("/register").post(upload.none(), registerUser)
router.route("/login").post(upload.none(),loginUser)

// Secured Routes (Login required)
// verifyJWT checks the token first. If valid, it allows logoutUser to run.
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/updateUserRole").patch(verifyJWT,updateUserRole)
export default router

//why the name is not affecting anything
//When you use export default, you are telling JavaScript: "This is the main thing coming out of this file."
//Because it is the default, the file importing it doesn't care what it was named originally. It lets you nickname it whatever you want.