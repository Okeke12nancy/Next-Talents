// Install Mongoose
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      trim: true,
      // required: ["please provide your full name"],
    },

    jobTitle: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: "String",
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    phone: {
      type: Number,
      min: 1,
    },

    email: {
      type: String,
      // unique: true,
      // required: ["please provide a email"],
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please add a valid email",
      // ],
    },

    password: {
      type: String,
      // required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    website: {
      type: String,
    },

    currentSalary: {
      type: Number,
    },

    expectedSalary: {
      type: Number,
    },

    experience: {
      type: String,
    },

    educationalLevel: {
      type: String,
    },
    language: {
      type: String,
    },
    categories: {
      type: String,
    },

    allowInSearch: {
      type: String,
      enum: ["yes", "no"],
      default: "yes",
      lowercase: true,
      required: true,
    },

    description: {
      type: String,
      // required: ["please provide your description"],
    },

    aboutCompany: {
      type: String,
    },
  },
  { timestamps: true }
);

profileSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

module.exports = mongoose.model("Profile", profileSchema);
