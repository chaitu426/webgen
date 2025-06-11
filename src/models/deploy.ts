import mongoose from "mongoose";
import { version } from "os";

const deploySchema = new mongoose.Schema({
    projectname:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    version:{
        type: String,
        default: "1.0"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aigen",
        required: true
    },
    deploymentStatus: {
        type: String,
        enum: ['pending', 'deployed', 'failed'],
        default: 'pending'
    }
},{
    timestamps: true,
    versionKey: false
});

const DeployModel = mongoose.model("Deploy", deploySchema);
export default DeployModel;