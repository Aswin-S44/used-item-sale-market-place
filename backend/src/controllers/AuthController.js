const bcrypt = require("bcrypt");
const Dealer = require("../models/dealerModel");
const { createSecretToken } = require("../utils/SecretToken");
const {
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
  STATUS_OK,
  STATUS_INTERNAL_SERVER_ERROR,
} = require("../constants/httpStatusCodes");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, phone, password, firstName, lastName } = req.body;

    const dealer = await Dealer.findOne({
      $or: [{ email }, { phone }],
    });

    if (dealer) {
      return res.status(400).json({
        message: "Dealer already exists with this email or phone",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDealer = await Dealer.create({
      email,
      phone,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const token = createSecretToken(newDealer._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    res.status(STATUS_CREATED).json({
      message: "Dealer account created successfully",
      success: true,
      user: newDealer,
    });

    next();
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports.SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "All fields are required" });
    }
    const dealer = await Dealer.findOne({ email });

    if (!dealer) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Dealer not exists with this email" });
    }

    const auth = await bcrypt.compare(password, dealer.password);

    if (!auth) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(dealer._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(STATUS_OK)
      .json({ message: "User logged in successfully", success: true });

    next();
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

module.exports.Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(STATUS_OK).json({
    message: "Logged out successfully",
    success: true,
  });
};
