const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} = require("../../constants/httpStatusCodes");
const Products = require("../../models/productModel");

module.exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    const products = await Products.find()
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(STATUS_OK).json({ message: "success", products });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
