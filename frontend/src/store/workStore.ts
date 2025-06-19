import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

type Work = {

  code: string;
  explanation: string;
  prompt: string;
  data:{
    createdBy: string;
    _id: string;
  }
};

type History = {
  version: string;
  code: string;
  description: string;
  prompt: string;
};

type Project = {
  data:{
    code: string;
    description: string;
    prompt: string;
    version: string;
    refinementHistory: History[];
  }
}
type Url = {
  deployments: {
    url: string;
    version: string;
  }[];
};


interface WorkState {
  work: Work | null;
  url: Url | null;
  project: Project | null;
  pendingPrompt: string | null;
  setPendingPrompt: (prompt: string) => void;
  setWork: (work: Work) => void;
  updateWork: (partialWork: Partial<Work>) => void;
  Generate: (prompt: string) => Promise<void>;
  GetProject: (projectId: string) => Promise<void>;
  GetDeployment: (projectId: string) => Promise<void>;
}

export const useWorkStore = create<WorkState>((set) => ({
  work: null,
  url: null,
  project: null,
  pendingPrompt: null,

  setPendingPrompt: (prompt) => set({ pendingPrompt: prompt }),

  setWork: (work) => set({ work }),

  setProject: (project: Project) => set({project}),

  updateWork: (partialWork) =>
    set((state) => ({
      work: state.work ? { ...state.work, ...partialWork } : null,
    })),

  GetProject: async (projectId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/aigen/project/${projectId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
      set({ work: response.data });
    } catch (error) {
      toast.error("Failed to fetch project.");
      console.error("GetProject error", error);
    }
  },

  GetAllProjects: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/aigen/projects`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
      set({ project: response.data });
    } catch (error) {
      toast.error("Failed to fetch projects.");
      console.error("GetAllProjects error", error);
    }
  },

  Generate: async (prompt: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/aigen/generate`,
        { prompt },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
      set({ work: response.data });
    } catch (error) {
      toast.error("Failed to generate.");
      console.error("Generate error", error);
    }
  },
  
  GetDeployment: async (projectId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/deploy/url/${projectId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      const deployments = response.data?.deployments;
  
      if (Array.isArray(deployments) && deployments.length > 0) {
        set({
          url: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            deployments: deployments.map((d: any) => ({
              url: d.url,
              version: d.version,
            }))
          }
        });
      } else {
        toast.info("No deployments found for this project.");
      }
    } catch (error) {
      toast.error("Failed to fetch deployment.");
      console.error("GetDeployment error", error);
      throw error;
    }
  }
  
  
}));
