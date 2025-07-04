import React, {useState} from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { BackgroundBeams } from "../components/ui/background-beams";
import { TextGenerateEffect } from "../components/ui/textGeneration";
import { toast } from "react-toastify";
 //import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import setu from "setu.js";


export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response =  await setu.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, {
          body:{
            email,
            password
          },
          retry:2,       

      });
      
      const token = response.data.token;
      console.log("Login successful, token:", token);
      console.log("Response data:", response.status);
      localStorage.setItem("token", token); // Save token
      toast.success("Login successful!");

      login(token); 
      navigate("/");
      
    } catch (error) {
      console.error("Error during login:", error );
      if (error instanceof Error) {
        toast.error(`Login failed: ${error.message || "Please try again later."}`);
      } else {
        toast.error("Login failed. Please try again later.");
      }
      
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundBeams />
      </div>

      <div className="shadow-input mx-auto w-full mt-32 max-w-md rounded-none bg-white p-6 md:rounded-2xl md:p-8 dark:bg-neutral-950">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white"><TextGenerateEffect words={"Welcome to WebGen"} /></h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Sign in to continue to your dashboard
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <LabelInputContainer>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="you@example.com" type="email" onChange={(e) => setEmail(e.target.value)} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" onChange={(e) => setPassword(e.target.value)} />
          </LabelInputContainer>

          <button
            type="submit"
            className="group/btn relative w-full h-10 rounded-md bg-black text-white font-medium dark:bg-white dark:text-black"
          >
            Sign Up →
            <BottomGradient />
          </button>

          <div className="flex gap-3  pt-4 p-1 text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">
              Don't have an account?
            </span>
            <Link to="/signup">
              <span className="text-blue-600 hover:underline dark:text-blue-400">
                Sign up for free
              </span>
            </Link>

          </div>
        </form>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      {/* Main glowing line */}
      <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover/btn:opacity-100 transition-all duration-500" />

      {/* Secondary blurred glow, pulsing */}
      <span className="absolute inset-x-10 -bottom-px mx-auto h-1 w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm group-hover/btn:opacity-100 animate-pulse" />

      {/* Optional subtle movement animation */}
      <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-0 group-hover/btn:opacity-70 animate-move-x" />
    </>
  );
};


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
