//import axios from 'axios';
import { create } from 'zustand';
import setu from "setu.js"



type User = {
  user:{
    _id: string;
    username: string;
    email: string;
  },
  projects:[{
    _id: string;
    code: string;
    version: string;
    refinementHistory:[{
      code: string;
      version: string;
    }]
    
  }]

};

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  user: User | null
  fetchProfile: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),

  isAuthenticated: !!localStorage.getItem("token"),


  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },


  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false ,user:null});

    window.location.reload();
  },


  user: null,

  setUser: (user) => set({ user, isAuthenticated: true }),
  

  fetchProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await setu.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user: res.data, isAuthenticated: true });
    } catch (err) {
      console.error("Failed to fetch user profile", err);
      set({ user: null, isAuthenticated: false });
    }
  },

}));