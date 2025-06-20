# 🌐 Webgen — AI-Powered Website Generator

**Webgen** is a full-stack AI tool that allows users to instantly generate and deploy modern websites using natural language prompts. Powered by LLMs and a sleek UI, it enables real-time code generation, preview, sharing, and one-click deployment to Vercel.



---

## ✨ Features

- 🤖 AI-based website generation using LLMs (OpenAI or Gemini)
- 🧠 Smart prompt enhancement and creative copywriting
- 💻 Live code preview and editing
- 🚀 One-click deployment via Vercel
- 🧾 Download or copy generated HTML code
- 🔐 Authentication and user management (JWT-based)
- 📦 Full TypeScript backend with Express
- ☁️ MongoDB integration for user sessions and project storage

---

## 📦 Tech Stack

### Frontend
- React + Tailwind CSS
- Axios for API calls
- Zustand for state management
- Framer Motion for animations

### Backend
- Node.js + TypeScript + Express
- MongoDB + Mongoose
- JWT & Bcrypt for Auth
- OpenAI/Gemini APIs for LLM integration
- Vercel API for deployment

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`
- MongoDB URI
- deepseek API key
- Vercel Access Token

---

### 1. Clone the repo

```bash
git clone https://github.com/chaitu426/webgen.git
cd webgen
npm install
```

```.ENV
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NEBIUS_API_KEY=your_google_genai_key
VERCEL_TOKEN=your_vercel_token
```



