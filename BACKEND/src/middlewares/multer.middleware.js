import multer from "multer";

//User → Multer → Cloudinary → Database → Back to User 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })


export const upload = multer({ 
    storage, 
})

//here the multer require the input field name 
//and we have passed it in like this in the route
//upload.single("file"), 
//whatever field name we give here we use it in the filecontroller