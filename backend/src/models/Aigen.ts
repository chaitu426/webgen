import mongoose from "mongoose";
import { version } from "os";


const aigenSchema = new mongoose.Schema({
    modelName: { 
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
         },
    code: { 
        type: String,
        required: true
         },
    version: { type: String,
        required: true,
        trim: true
         },
    description: { 
        type: String,
        trim: true
         },
    refinementHistory: [
      {
        code: String,
        version: String,
        refinedAt: { type: Date, default: Date.now }
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, {
    timestamps: true,
    versionKey: false
  });
  
const AigenModel = mongoose.model("AigenModel", aigenSchema);
export default AigenModel;