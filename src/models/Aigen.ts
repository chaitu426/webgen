import mongoose from "mongoose";


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
        trim: true,
        maxlength: 20
         },
    description: { 
        type: String,
        trim: true
         },
    refinementHistory: [
      {
        code: String,
        reason: String,
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