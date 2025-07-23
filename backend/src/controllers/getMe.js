const { PRODUCT_STATUS_TYPES } = require("../constants/constant");
const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Dealer = require("../models/dealerModel");
const Products = require("../models/productModel");

module.exports.getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const dealer = await Dealer.findOne({ _id: userId }).lean();
    const totalCarsCount = await Products.find({
      dealerId: userId,
    }).countDocuments();

    const totalSoldCarsCount = await Products.find({
      dealerId: userId,
      status: PRODUCT_STATUS_TYPES.SOLD,
    }).countDocuments();

    const respObj = {
      ...dealer,
      totalCarsCount,
      totalSoldCarsCount,
    };

    if (!dealer) {
      return res.status(STATUS_NOT_FOUND).json({ message: "Dealer not found" });
    }

    res.status(STATUS_OK).json({ message: "success", user: respObj });
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Internal Server Error" });
  }
};
