const dotenv = require("dotenv");
const connectDB = require("./configs/databaseConfig");
const app = require("./app");
require("colors");
const logger = require("./configs/logger.config");

// connection
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3001;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
