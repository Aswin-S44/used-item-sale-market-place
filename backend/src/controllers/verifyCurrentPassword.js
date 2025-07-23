const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_FORBIDDEN,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Dealer = require("../models/dealerModel");
const bcrypt = require("bcrypt");
const { generateOTP, sendEmail } = require("../utils/utils");
const OTP = require("../models/otpModel");
const { sentOTPTemplate } = require("../email-templates/otp-template");

module.exports.verifyCurrentPassword = async (req, res) => {
  try {
    const dealerId = req.user._id;
    const { password } = req.body;

    const dealer = await Dealer.findById(dealerId);

    if (!dealer) {
      return res.status(STATUS_NOT_FOUND).json({ message: "Dealer not found" });
    }

    const passwordCorrect = await bcrypt.compare(password, dealer.password);

    if (!passwordCorrect) {
      return res
        .status(STATUS_FORBIDDEN)
        .json({ message: "Invalid current password" });
    }

    const otp = generateOTP();

    await OTP.deleteOne({ email: dealer.email });

    const newOTP = new OTP({
      email: dealer.email,
      otp,
      verified: false,
    });

    await newOTP.save();

    let htmlContent = sentOTPTemplate(otp);

    await sendEmail(
      process.env.EMAIL_USER,
      "Your OTP for Revibe reset password",
      htmlContent,
      htmlContent,
      dealer.email
    );

    return res.status(STATUS_OK).json({ message: "Verification OTP Sent" });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
