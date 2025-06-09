import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // Regular expression to validate email format
  },            
    password: {
        type: String,
        required: true,
        minlength: 6,
        // Minimum length for password
    }
    
},
{
    timestamps: true,
    // Automatically manage createdAt and updatedAt fields
    versionKey: false
}
);



const User = mongoose.model("User", userSchema);
export default User;