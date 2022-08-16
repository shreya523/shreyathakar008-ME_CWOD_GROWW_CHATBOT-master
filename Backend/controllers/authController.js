const { User } = require("./../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      DOB: req.body.DOB,
      phoneNum: req.body.phoneNum,
      PANNum: req.body.PANNum,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      token,
      status: "Success",
      data: {
        user: newUser,
      },
    });
    console.log("User created: " + newUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      throw new Error("Please provide Email and Password to login!");
    }

    // 2) Check if user exist and password is correct
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      throw new Error("User does not exist with given email address: " + email);
    } else if (!(await user.correctPassword(password, user.password))) {
      throw new Error("Wrong password!!");
    }

    // 3) Send token
    const token = signToken(user._id);
    res.status(200).json({
      user,
      status: "success",
      token,
    });

    console.log("Logged in user: " + user.name);
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new Error("Please login!");
    }

    // 2) Validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      throw new Error("User does not exists");
    }
    // 4) If user change password after token issued
    // if(freshUser.changePasswordAfter(decoded.iat)){

    // }
    req.user = freshUser;
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};
