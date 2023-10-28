const app = require("./app");
//Handling uncaught exception  -- Error Handling for undefined variable and all
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shutting down the Server due to uncaught exception");
  process.exit(1);
});
const dotenv = require("dotenv");
dotenv.config({ path: "api/config/config.env" });

//MongoDb Connection
const connectDB = require("./utils/database");
connectDB();

//Port Connection
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Unhandle Promise Rejection  -- Error Handling for something like wrong mongoDb URI
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shutting down the Server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
