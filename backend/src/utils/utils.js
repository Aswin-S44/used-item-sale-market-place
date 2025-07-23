const nodemailer = require("nodemailer");
const crypto = require("crypto");
const OTP = require("../models/otpModel");
const {
  STATUS_FORBIDDEN,
  STATUS_BAD_REQUEST,
  STATUS_OK,
} = require("../constants/httpStatusCodes");

require("dotenv").config();

module.exports.sendEmail = async (
  from,
  subject,
  content,
  htmlContent = null,
  to
) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from,
      to,
      subject,
      text: content,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Error while sending email : ", error);
    return error;
  }
};

module.exports.generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

module.exports.verifyOTP = async (email, otp) => {
  try {
    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      return res
        .status(STATUS_FORBIDDEN)
        .json({ message: "OTP expired or invalid" });
    }

    if (otpDoc.otp !== otp) {
      return false;
    }

    otpDoc.verified = true;
    await otpDoc.save();

    return true;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};
