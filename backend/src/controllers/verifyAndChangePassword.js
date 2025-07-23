const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_FORBIDDEN,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Dealer = require("../models/dealerModel");
const { verifyOTP } = require("../utils/utils");
const bcrypt = require("bcrypt");

module.exports.verifyAndChangePassword = async (req, res) => {
  try {
    const dealerId = req.user._id;
    const { otp, new_password } = req.body;

    const dealer = await Dealer.findById(dealerId);

    if (!dealer) {
      return res.status(STATUS_NOT_FOUND).json({ message: "Dealer not found" });
    }

    const isOTPVerified = await verifyOTP(dealer.email, otp);

    if (!isOTPVerified) {
      return res.status(STATUS_FORBIDDEN).json({ message: "Incorrect OTP" });
    }

    const newHashedPassword = await bcrypt.hash(new_password, 10);

    await Dealer.updateOne(
      { _id: dealerId },
      { $set: { password: newHashedPassword } }
    );

    return res
      .status(STATUS_OK)
      .json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
