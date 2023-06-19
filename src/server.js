const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddlewares");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const connectDB = require("./configs/databaseConfig");
const cookieSession = require("cookie-session");
const path = require("path");
const userRoute = require("./routes/userRoutes");
const resumeRoute = require("./routes/resume");
const profileRoute = require("./routes/profile");

require("colors");
const logger = require("./configs/logger.config");

// http server instance

dotenv.config();
connectDB();

const app = express();
// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

// var userProfile;

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/resume", resumeRoute);
app.use("/api/v1/profile", profileRoute);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

require("./configs/passport");

require("dotenv").config();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pages", "index.html"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
