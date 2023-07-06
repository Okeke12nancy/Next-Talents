const authRoute = require("./authRoute");
const userRoute = require("./userRoutes");
const resumeRoute = require("./resume");
const profileRoute = require("./profile");

const basePath = "/api/v1";

module.exports = (app) => {
  app.use(`${basePath}/auth`, authRoute);
  app.use(`${basePath}/user`, userRoute);
  app.use(`${basePath}/resume`, resumeRoute);
  app.use(`${basePath}/profile`, profileRoute);
};
