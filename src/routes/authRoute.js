const express = require("express");
const app = express();
// const passport = require("../configs/passport");
const passport = require("passport");
const path = require("path");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const authController = require("../controllers/auth");
const validate = require("../middlewares/validate.middlewares");
const {
  registerSchema,
  loginSchema,
  updatePasswordSchema,
  updateDetailsSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  confirmEmailSchema,
} = require("../validations/schema");
// Register User
router.post("/register", [validate(registerSchema)], authController.register);

//construct the employee routes

//Construct the candidate routes

// User Login
router.post("/login", [validate(loginSchema)], authController.login);

// User Logout
router.get("/logout", authController.logout);

// Get Current User
router.get("/me", protect, authController.getMe);

// Update User Details
router.put(
  "/updatedetails",
  protect,
  [validate(updateDetailsSchema)],
  authController.updateDetails
);

// Update Password
router.put(
  "/updatepassword",
  protect,
  [validate(updatePasswordSchema)],
  authController.updatePassword
);

// Forgot Password
router.post(
  "/forgotpassword",
  [validate(forgotPasswordSchema)],
  authController.forgotPassword
);

// Reset Password
router.put(
  "/resetpassword/:resettoken",
  [validate(resetPasswordSchema)],
  authController.resetPassword
);

// Confirm Email
router.get(
  "/confirmemail",
  [validate(confirmEmailSchema)],
  authController.confirmEmail
);

// Here
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

router.get("/success", (req, res) => {
  console.log(req.user);
  res.render("success", {
    user: req.user,
  });
});

router.get("/error", (req, res) => res.send("error logging in"));

// Google Login
router.get(
  "/candidate/auth/google",
  function (req, res, next) {
    process.env.user_type = "candidate";
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    successRedirect: "/success",
  })
);

router.get(
  "/employer/auth/google",
  function (req, res, next) {
    process.env.user_type = "employer";
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/api/v1/auth/success");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});
(req, res) => {
  res.redirect("/"); // Redirect to the desired route after successful authentication
};

module.exports = router;
