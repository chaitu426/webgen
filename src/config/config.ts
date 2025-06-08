import {config as conf} from 'dotenv';
conf();

const config ={
    port: process.env.PORT || 3000,
    geminiApiKey: process.env.AI_API_KEY|| '',
    nebiusApiKey: process.env.NEBIUS_API_KEY || '',
    openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
};

export default Object.freeze(config);