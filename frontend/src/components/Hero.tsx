import { BackgroundBeams } from "../components/ui/background-beams";
import { TextGenerateEffect } from "./ui/textGeneration";
import { Cover } from "../components/ui/cover";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";


const suggestions = [
    { label: "Clone Airbnb", color: "bg-pink-700" },
    { label: "Task Manager", color: "bg-green-600" },
    { label: "AI Pen", color: "bg-cyan-700" },
    { label: "Surprise Me", color: "bg-emerald-700" },
];

export function BackgroundBeamsDemo() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSend = () => {
        setLoading(true);

        setTimeout(() => {
            navigate("/workspace");
        }, 2000); // simulate loading delay
    };


    return (
        <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative overflow-hidden">
            {/* Background animation */}
            <BackgroundBeams />

            {/* Foreground content */}
            <div className="relative z-10 flex flex-col antialiased">
                <div className="max-w-2xl mt-30 mx-30 p-4">
                    <TextGenerateEffect words={"Welcome Chaitu"} />
                    <h1 className="text-xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-left font-semibold">
                        Build amazing websites at <Cover>warp speed</Cover>
                    </h1>
                </div>


                <div className="w-full max-w-3xl mx-auto p-4 mt-6 space-y-4">
                    <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-zinc-600 lex flex-col">
                        <textarea
                            rows={2}
                            cols={72}
                            placeholder="Build me a clone of netflix..."
                            className="bg-transparent resize-none outline-none text-white placeholder:text-neutral-500 px-2"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <div className="flex justify-between items-center mt-3 px-1">
                            <div className="flex gap-2 items-center">
                                <button className="text-white hover:bg-neutral-800 p-2 rounded-full">
                                    <IoMdAttach size={18} />
                                </button>
                                <button className="bg-neutral-800 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm">
                                    <FaGithub />
                                    Connect GitHub
                                </button>
                                <button className="bg-neutral-800 text-white px-2 py-1 rounded-md text-xs">
                                    W-1
                                </button>
                            </div>
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={handleSend}
                                    disabled={loading}
                                    className={`bg-neutral-700 hover:bg-neutral-600 text-white p-2 rounded-xl w-10 h-10 flex items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {loading ? (
                                        <LoaderCircle className=" animate-spin" /> // or use a spinner
                                    ) : (
                                        <IoSend size={20} />
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 ml-24 mt-6">
                        {suggestions.map((s, idx) => (
                            <button key={idx} className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">

                                <span className="absolute inset-0 overflow-hidden rounded-full">
                                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </span>
                                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                    <span>
                                        {s.label}
                                    </span>
                                    <svg
                                        fill="none"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        width="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.75 8.75L14.25 12L10.75 15.25"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                </div>
                                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
