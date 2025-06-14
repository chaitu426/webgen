import React, { useState } from "react";
import { 
  SendHorizonal, 
  Code, 
  Eye, 
  Download, 
  Copy,
  Paperclip,
  MoveUpRight,
} from "lucide-react";
import { BackgroundBeams } from "../components/ui/background-beams";

export default function WebgenWorkspace() {
  const [messages, setMessages] = useState<{ type: string; content: string; hasCode?: boolean }[]>([
    { type: 'system', content: 'Hey! I\'m WebGen AI. Tell me what kind of website you want to build, and I\'ll create it for you instantly.' }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;
    
    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        type: 'ai', 
        content: `Perfect! I'll create a ${input.toLowerCase().includes('portfolio') ? 'stunning portfolio' : input.toLowerCase().includes('landing') ? 'converting landing page' : input.toLowerCase().includes('blog') ? 'beautiful blog' : 'amazing website'} for you. Let me work my magic... ✨`,
        hasCode: true
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
      setActiveTab('preview');
    }, 2000);
  };



  return (

    <div className="flex h-screen w-full bg-neutral-950 text-white relative overflow-hidden">
      {/* Animated background similar to your BackgroundBeams */}
      
        
                <BackgroundBeams />
              
      {/* Chat Area */}
      <div className="relative z-10 w-2/5 flex flex-col border-r border-neutral-800/50">
        {/* Header */}
        <div className="w-full px-6 py-3 border-b border-neutral-800/50 bg-gradient-to-r from-[#0f0f0f] via-[#111111] to-[#0f0f0f] backdrop-blur-md sticky top-0 z-50">
  <div className="flex items-center p-2 text-sm font-medium text-white tracking-wide">
    <span className="relative flex items-center gap-2 ">
      {/* Static green dot */}
      <span
        className="relative inline-flex rounded-full h-3 w-3 bg-green-500"
        title="Webgen is live"
      ></span>
      Webgen is running...
    </span>
  </div>
</div>


        {/* Messages */}
        <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.type === 'user' 
                  ? 'bg-neutral-700 text-white' 
                  : msg.type === 'system'
                  ? 'bg-neutral-800/60 border border-neutral-700/50 text-neutral-100'
                  : 'bg-neutral-800/80 text-neutral-100 border border-neutral-700/30'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                {msg.hasCode && (
                  <div className="mt-3 flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">Website generated</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-neutral-800/80 rounded-2xl px-4 py-3 max-w-[85%] border border-neutral-700/30">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                  <span className="text-sm text-neutral-300">Creating your website...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts - Similar to your suggestions */}
        
        {/* Input Area - Similar to your design */}
        <div className="p-4 border-t border-neutral-800/50 bg-neutral-900/30 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-zinc-600">
            <textarea
              rows={2}
              placeholder="Build me a clone of netflix..."
              className="w-full bg-transparent resize-none outline-none text-white placeholder:text-neutral-500 px-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            />
            
            <div className="flex justify-between items-center mt-3 px-1">
              <div className="flex gap-2 items-center">
                <button className="text-white hover:bg-neutral-800 p-2 rounded-full">
                  <Paperclip size={18} />
                </button>
                
                <button className="bg-neutral-800 text-white px-2 py-1 rounded-md text-xs">
                  W-1
                </button>
              </div>
              <div className="flex gap-2 items-center">
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  className="bg-neutral-700 hover:bg-neutral-600 text-white p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SendHorizonal size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative z-10 w-3/5 flex flex-col bg-neutral-900/20 backdrop-blur-sm">
        {/* Preview Header */}
        <div className="flex items-center justify-between p-2 border-b border-neutral-800/50 bg-neutral-900/30 backdrop-blur-sm">
          <div className="flex items-center bg-neutral-800/50 rounded-lg p-1 border border-neutral-700/50">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'preview' 
                  ? 'bg-neutral-700 text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'code' 
                  ? 'bg-neutral-700 text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Code className="h-4 w-4" />
              <span>Code</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg text-sm font-medium text-neutral-300 hover:text-white transition-all border border-neutral-700/50">
              
              <span>Deploy</span>
            </button>
            <button className="p-2 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-all border border-neutral-700/50">
              <MoveUpRight className="h-4 w-4" />
            </button>
            <button className="p-2 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-all border border-neutral-700/50">
              <Copy className="h-4 w-4" />
            </button>
            <button className="p-2 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-all border border-neutral-700/50">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'preview' ? (
            <div className="h-full p-6">
              <div className="h-full bg-neutral-900/60 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
                <iframe
                  srcDoc={`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Website Preview</title>
                      <style>
                        body {
                          margin: 0;
                          font-family: Arial, sans-serif;
                          background-color: #121212;
                          color: #ffffff;
                          }
                          h1 {
                            text-align: center;
                            margin-top: 50px;
                            }
                            </style>
                            </head>
                            <body>
                            <h1>Welcome to Your Website Preview!</h1>
                            </body>
                            </html>`}
                    className="w-full h-full"
                    title="Website Preview"
                ></iframe>
                </div>
            </div>
          ) : (
            <div className="h-full p-6">
              <div className="h-full bg-neutral-900/60 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-neutral-700/50 bg-neutral-800/40">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-neutral-400 font-medium">Generated Code</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                      HTML/CSS/JS
                    </span>
                  </div>
                </div>
                <div className="p-8 flex items-center justify-center h-full">
                  <div className="text-center">
                    <Code className="h-16 w-16 mx-auto mb-6 text-neutral-600" />
                    <h4 className="text-lg font-medium text-neutral-300 mb-2">Code Editor</h4>
                    <p className="text-neutral-500">Your generated code will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}