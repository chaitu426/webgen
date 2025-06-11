import { Request, Response } from 'express';
import AigenModel from '../models/Aigen';
import DeployModel from '../models/deploy';
import config from '../config/config';



  export const deployToVercel = async (req:Request, res:Response) => {
    const Id = req.params.id;
    const user = req.user;
    
    const { projectname } = req.body;

    if (!user || (typeof user !== "object" || !("userId" in user))) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const project = await AigenModel.findById(Id);
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }

    // Check if current user is the creator
    if (project && project.createdBy.toString() !== (user as { userId: string }).userId.toString()) {
        res.status(403).json({ message: "Forbidden: You don't own this project" });
    }
  
    const files = [
      {
        file: "index.html",
        data: `${project.code}`,
      },
      {
        file: "vercel.json",
        data: JSON.stringify({
          rewrites: [{ source: "/", destination: "/index.html" }],
        }),
      },
    ];
  
    const projectName = `webgen-${projectname}-${Date.now()}`;
  
    const response = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        files,
        projectSettings: {
          framework: null,
        },
      }),
    });
  
    const data = await response.json();
    if (data.url) {
        // Save deployment details to the database
        const NewDeploy = await DeployModel.create({
            projectname: projectname,
            url: data.url,
            version: project.version,
            createdBy: (user as { userId: string }).userId,
            projectId: Id,
            deploymentStatus: 'deployed'
        })
        if(NewDeploy){
            res.json({ success: true + "saved to database",projectName:projectname, url: `https://${data.url}` });
        }
      
    } else {
      res.status(400).json({ success: false, error: data });
    }
  };
  