import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt"; // Import bcrypt for file passwords
import jwt from "jsonwebtoken"

const fileSchema = new Schema(
    {
        fileUrl: {
            type: String, 
            required: true
        },
        publicId: {
            type: String, 
            required: true
        },
        title: {
            type: String, 
            required: true,
            index: true 
            // Makes searching by title faster
        },
        description: {
            type: String, 
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ["Finance", "Engineering", "HR", "Legal", "Marketing", "General"], 
            // Restrict to specific types
            default: "Other"
        },
        password: {
            type: String, 
            default: null 
        },
        fileType: {
            type: String,
            required: true
        },
        size: {
            type: Number, 
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
            
        }
    },
    {
        timestamps: true
    }
)

//do not use next here vecause it is a async function which will give error later on
//TypeError: next is not a function 
fileSchema.pre("save", async function () {

    if(!this.isModified("password") || !this.password) return ;
    
    this.password = await bcrypt.hash(this.password, 10)
    
})

fileSchema.methods.isPasswordCorrect = async function(enteredPassword){
    if (!this.password) return true; 
    return await bcrypt.compare(enteredPassword, this.password)
    ////this password is the hashed password stored in db
}
fileSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        { 
            _id: this._id,         // The FILE ID not user ID
            email: this.owner.email 
        },
        process.env.FILE_ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.FILE_ACCESS_TOKEN_EXPIRY || "15m" }
    )
}

fileSchema.plugin(mongooseAggregatePaginate)

export const File = mongoose.model("File", fileSchema)

