import app from "./app";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown (Handles Process Kill Events)
process.on("SIGTERM", async () => {
    console.log("⚠️ Shutting down server...");
    server.close(() => {
      console.log("Server shut down gracefully.");
      process.exit(0);
    });
  });
  
  process.on("SIGINT", async () => {
    console.log("⚠️ Process interrupted. Closing server...");
    server.close(() => process.exit(0));
  });
export default server;  
