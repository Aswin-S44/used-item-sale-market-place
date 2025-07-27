require("dotenv").config();
const jwt = require("jsonwebtoken");
const Dealer = require("../src/models/dealerModel");
const { STATUS_FORBIDDEN } = require("../src/constants/httpStatusCodes");

module.exports.userVerification = (req, res, next) => {
  const token =
    req.cookies.token ||
    req.headers["authorization"]?.split(" ")[1] ||
    req.body?.token;
  if (!token) {
    return res.status(STATUS_FORBIDDEN).json({ message: "Forebidden" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await Dealer.findById(data.id);
      if (user) {
        req.user = user;
        req.userId = user._id;
        next();
      } else {
        return res.json({ status: false });
      }
    }
  });
};
