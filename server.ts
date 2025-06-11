import app from "./src/index";
import connectDB from "./src/config/db";
import config from "./src/config/config"
const server = async ()=>{
  const PORT = config.port || 3000;
  // Connect to the database
  await connectDB();
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

server().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});

