const app = require("./app");

const dotenv = require("dotenv");
const connectDB = require("./config/database");

//  Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);
  process.exit(1);
});

// config
dotenv.config({ path: "backend/config/config.env" });
const DATABASE_URL = process.env.DATABASE_URL;

// Database connection
connectDB(DATABASE_URL);

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});

// unhandled exception handler

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down server due to unhandeld Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
