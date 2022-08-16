const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  PANNum: {
    type: String,
    validate: {
      validator: function (v) {
        return /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(v);
      },
      message: (props) => `${props.value} is not a valid PAN Number!`,
    },
  },
  addressProof: { type: String },
});
const kycSchema = new Schema({
  status: { type: String, enum: ["Completed", "Not Complete"] },
  documents: { type: documentSchema },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid email address!"],
  },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  DOB: { type: Date },
  phoneNum: {
    type: Number,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false,
  },
  kyc: { type: kycSchema },
  maxAmountForOrdersPerDay: {type: Number},
  amountUsedToday: {type: Number},
  oreders: [{ type: Schema.ObjectId, ref: "Order" }],
});

userSchema.virtual("passwordLastChangedAt");

userSchema
  .virtual("passwordConfirmation")
  .get(function () {
    return this._passwordConfirmation;
  })
  .set(function (value) {
    this._passwordConfirmation = value;
  });

userSchema.pre("validate", function (next) {
  if (!this.passwordConfirmation) {
    this.invalidate("passwordConfirmation", "Please confirm your password!");
  } else if (this.password !== this.passwordConfirmation) {
    this.invalidate(
      "passwordConfirmation",
      "Password and confirm password must be same"
    );
  }

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

exports.User = mongoose.model("User", userSchema);
