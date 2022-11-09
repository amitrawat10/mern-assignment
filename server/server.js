import app from "./app.js";
import connectDB from "./config/Db.js";
import dotenv from "dotenv";
process.on("uncaughtException", (e) => {
  console.log(`Error: ${e.message}`);
  console.log("Shutting the server down due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "./config/config.env" });
connectDB(process.env.DB_URI);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// handles Unhandled Rejection
process.on("unhandledRejection", (e) => {
  console.log(`Error ${e.message}`);
  console.log(`Shutting the server down due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
