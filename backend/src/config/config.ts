import {config as conf} from 'dotenv';
conf();

const config ={
    port: process.env.PORT || 3000,
    geminiApiKey: process.env.GEMINI_API_KEY|| '',
    nebiusApiKey: process.env.NEBIUS_API_KEY || '',
    openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
    dburl: process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET,
    vercelToken: process.env.VERCEL_TOKEN || '',
};

export default Object.freeze(config);