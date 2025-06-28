// WebgenWorkspace.tsx
import { useEffect, useRef, useState } from "react";
import {
  SendHorizonal,
  Code,
  Eye,
  Download,
  Copy,
  Paperclip,
  MoveUpRight,
  Globe,
  Link2,
} from "lucide-react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { useWorkStore } from "../store/workStore";
//import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Loader from "../components/ui/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";
import { useAuthStore } from "../store/authStore";
import Editor from "@monaco-editor/react";
import setu from "setu.js";


export default function WebgenWorkspaceId() {
  const [messages, setMessages] = useState<
    { type: string; content: string; hasCode?: boolean }[]
  >([
    {
      type: "system",
      content:
        "Hey! I'm WebGen AI. welcome to your project what enhancemant you want to do ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { GetProject, work, updateWork } = useWorkStore();
  const [isDeloying, setIsDeploying] = useState(false);
  const [opend, setOpend] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const GetDeployment = useWorkStore((state) => state.GetDeployment);
  const url = useWorkStore((state) => state.url);
  const [open, setOpen] = useState(false);
  const params = useParams();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;
  
    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);
    setActiveTab("preview");
  
    const websiteType = input.toLowerCase().includes("portfolio")
      ? "a stunning portfolio"
      : input.toLowerCase().includes("landing")
      ? "a high-converting landing page"
      : input.toLowerCase().includes("blog")
      ? "a beautiful blog"
      : "a sleek modern website";
  
    const aiIntroMessage = {
      type: "ai",
      content: `✨ Got it! Let me design **${websiteType}** for you. Fetching design patterns, injecting animations, and assembling the UI magic... 🛠️`,
      hasCode: false,
    };
    setMessages((prev) => [...prev, aiIntroMessage]);

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json", },
      timeout: 5000,
      retries: 3,
      body: {Prompt: input},
    };
  
    try {
      const response = await setu.put(
        `${import.meta.env.VITE_BASE_URL}/api/aigen/enhance/${params.id}`, config);
  
      const result = response.data;
      updateWork(result);
  
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: `🚀 Done! Your code is ready. Click on **Preview** to see your creation or switch to **Code** to explore and tweak the HTML.`,
          hasCode: true,
        },
      ]);
      setActiveTab("preview");
    } catch (error) {
      console.error("Error generating site:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: `⚠️ Hmm... something went wrong on my end. Please try again in a moment.`,
        },
      ]);
    }
  
    setIsGenerating(false);
  };
  

  useEffect(() => {

    const getproject = async () => {

      if (params.id) {
        await GetProject(params.id);

        setActiveTab("preview");
        setLoading(false)
        await GetDeployment(params.id);

      } else {
        console.error("Project ID is undefined");
      }

    }

    getproject();


  }, [GetProject, params.id, GetDeployment]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(work?.code || "");
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([work?.code || ""], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "webgen.html";
    link.click();
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([work?.code || ""], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    const token = localStorage.getItem("token");
  
    try {
      const responce = await setu.post(
        `${import.meta.env.VITE_BASE_URL}/api/deploy/vercel/${params.id}`,
        { body:{projectname: "webgen-project"},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
       }
       }
      );
  
      const deployUri = responce.data.url;
  
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: `Your website is live! <a href="${deployUri}" target="_blank" class="text-blue-400 underline hover:text-blue-500">Click here to view it</a>. Share it proudly – it's deployment done right!`,
          hasCode: false,
        },
      ]);
      toast.success("Website deployed successfully!");
    } catch (error) {
      console.error("Error deploying website:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: `Oops! Deployment failed. Check your internet connection or try again in a few minutes.`,
          hasCode: false,
        },
      ]);
      toast.error("Failed to deploy website.");
    } finally {
      setIsDeploying(false);
    }
  };
  

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-white relative overflow-hidden">
      <BackgroundBeams />

      {/* Chat Panel */}
      <div className="relative z-10 w-2/5 flex flex-col border-r border-neutral-800/50">
        <div className="sticky top-0 z-50 px-6 py-3 border-b border-neutral-800/50 bg-gradient-to-r from-[#0f0f0f] via-[#111111] to-[#0f0f0f]">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
            Webgen is running...
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              key={i}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.type === "user"
                  ? "bg-neutral-700"
                  : msg.type === "system"
                    ? "bg-neutral-800/60 border border-neutral-700/50"
                    : "bg-gradient-to-br from-blue-900 to-neutral-800/80 border border-blue-700/30 shadow-sm shadow-blue-500/20"
                  }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                {msg.hasCode && (
                  <div className="mt-3 flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">
                      Website generated
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-neutral-800/80 rounded-2xl px-4 py-3 max-w-[85%] border border-neutral-700/30">
                <div className="flex items-center space-x-3">
                  <Loader2 className="animate-spin text-blue-400" />
                  <span className="text-sm text-neutral-300">
                    Enhancing your website...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-neutral-800/50 bg-neutral-900/30">
          <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-zinc-600">
            <textarea
              rows={2}
              placeholder="Build me a clone of netflix..."
              className="w-full bg-transparent resize-none outline-none text-white placeholder:text-neutral-500 px-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), handleSend())
              }
            />
            <div className="flex justify-between items-center mt-3 px-1">
              <div className="flex gap-2 items-center">
                <button className="text-white hover:bg-neutral-800 p-2 rounded-full">
                  <Paperclip size={18} />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="bg-neutral-700 hover:bg-neutral-600 text-white p-2 rounded-xl disabled:opacity-50"
              >
                <SendHorizonal size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview/Code Panel */}
      <div className="relative z-10 w-11/12 flex flex-col bg-neutral-900/20">
        <div className="flex items-center justify-between p-1.5 border-b border-neutral-800/50 bg-neutral-900/30">
          <div className="flex items-center bg-neutral-800/50 rounded-lg p-0.5 border border-neutral-700/50">
            {["preview", "code"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab
                  ? "bg-neutral-700 text-white shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
                  }`}
              >
                {tab === "preview" ? <Eye className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">


            <div className="relative inline-flex">
              <button
                onClick={() => setOpend((prev) => !prev)}
                className=" inline-flex items-center font-medium rounded-full bg-transparent  hover:bg-neutral-900 focus:outline-hidden"
              >
                <Link2 size={20} />

              </button>

              {opend && (
                <div className="absolute right-0 mt-12 min-w-52 bg-[#1a1a1a] p-4 border border-zinc-600 text-white shadow-xl rounded-xl z-50">
                  <div className="space-y-1">
                    {url?.deployments && url.deployments.length > 0 ? (
                      <div className="space-y-2">
                        {url.deployments.map((deployment, index) => (
                          <a
                            key={index}
                            href={`https://${deployment.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-neutral-900 hover:bg-neutral-800 transition-all border border-neutral-700/60 px-4 py-2 rounded-lg shadow-sm group"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-blue-400 group-hover:underline text-sm truncate max-w-[220px]">
                                {deployment.url}
                              </span>
                            </div>
                            <span className="text-xs text-neutral-500 group-hover:text-white bg-neutral-800 px-2 py-0.5 rounded-md">
                              v{deployment.version}
                            </span>
                          </a>
                        ))}
                      </div>

                    ) : (
                      <span className="text-neutral-400 text-sm">No deployments yet</span>
                    )}

                  </div>
                </div>

              )}
            </div>


            <button
              onClick={handleDeploy}
              className="p-0.5 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white border border-neutral-700/50"
            >
              {isDeloying ? (
                <Loader2 className="animate-spin text-blue-400" size={20} />
              ) : (
                <Globe size={20} />
              )}
            </button>

            <button
              onClick={handleOpenInNewTab}
              className="p-0.5 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white border border-neutral-700/50"
            >
              <MoveUpRight size={20} />
            </button>
            <button
              onClick={handleCopy}
              className="p-0.5 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white border border-neutral-700/50"
            >
              <Copy size={20} />
            </button>
            <button
              onClick={handleDownload}
              className="p-0.5 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white border border-neutral-700/50"
            >
              <Download size={20} />
            </button>
            <div className="relative inline-flex">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className=" inline-flex items-center font-medium rounded-full bg-transparent  hover:bg-neutral-900 focus:outline-hidden"
              >
                <Avatar name={user?.user.username} colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} variant="beam" size={35} />


              </button>

              {open && (
                <div className="absolute right-0 mt-12 min-w-52 bg-[#1a1a1a] p-4 border border-zinc-600 text-white shadow-xl rounded-xl z-50">
                  <div className="space-y-1">
                    <div className="px-3 py-2 rounded-lg hover:bg-neutral-900 transition-colors">
                      <p className="font-semibold text-sm">{user?.user.username}</p>
                      <p className="text-xs text-neutral-400">{user?.user.email}</p>
                    </div>

                    <Link
                      to="/"
                      className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-neutral-900 transition-colors"
                    >
                      Home
                    </Link>

                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-neutral-900 transition-colors"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-neutral-900 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>

              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === "preview" ? (
            <div className="h-full p-1">
              <div className="h-full justify-center content-center bg-neutral-900/60 rounded-2xl border border-neutral-700/50 overflow-hidden">
                {loading || !work?.code ? (
                  <Loader />
                ) : (
                  <iframe
                    srcDoc={work.code}
                    className="w-full h-full"
                    title="Website Preview"
                  ></iframe>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full p-1">
              <div className="h-full bg-neutral-900 rounded-2xl border border-neutral-700/50 overflow-hidden shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-neutral-700/50 bg-neutral-800/70">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <span className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-sm text-neutral-400 font-medium">Generated Code</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    HTML/CSS/JS
                  </span>
                </div>

                <div className=" h-[90vh] bg-neutral-950 overflow-auto">
                  {loading || !work?.code ? (
                    <Loader />
                  ) : (
                    <Editor
                      height="100%"
                      defaultLanguage="html"
                      value={work.code}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        fontSize: 14,
                        minimap: { enabled: false },
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        automaticLayout: true,
                        scrollbar: {
                          verticalScrollbarSize: 4,
                          horizontalScrollbarSize: 4,
                        },
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
}
