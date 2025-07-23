const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Products = require("../models/productModel");

module.exports.getDealerAnalytics = async (req, res) => {
  try {
    const dealerId = req.user._id;

    const totalProducts = await Products.countDocuments({ dealerId });
    const totalSold = await Products.countDocuments({
      dealerId,
      status: "sold",
    });
    const totalActive = await Products.countDocuments({
      dealerId,
      status: "available",
    });

    const viewsAggregation = await Products.aggregate([
      { $match: { dealerId } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const totalViews = viewsAggregation[0]?.totalViews || 0;

    res.status(STATUS_OK).json({
      totalProducts,
      totalSold,
      totalActive,
      totalViews,
    });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
