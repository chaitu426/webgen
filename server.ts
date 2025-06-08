import app from "./src/index";
import config from "./src/config/config"
const server = async ()=>{
  const PORT = config.port || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

server().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});