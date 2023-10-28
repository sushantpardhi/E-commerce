const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    maxlength: [30, "Name cannot excceed 30 characters"],
    minLength: [4, "Name should be more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: [true],
    validate: [validator.isEmail, "Please enter a valid Email"], //will validate that the input string is a valid email or not
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, //will not give password when we will find and get the user data
  },
  avatar: {
    public_Id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "User",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//pre hashing the password before storing in database
userSchema.pre("save", async function (next) {
  //Check if the password is updated or not, if not updated then next()
  //this applies when user updated the details and not password
  if (!this.isModified("password")) {
    next();
  }
  //if password is updated then it will hash it and update/save it to database
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Users", userSchema);
