const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddlewares");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const appRoutes = require("./routes/app.routes");

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
appRoutes(app);

module.exports = app;
