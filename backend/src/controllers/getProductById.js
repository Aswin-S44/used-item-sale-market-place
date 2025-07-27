const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Products = require("../models/productModel");

module.exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId).populate("dealerId");
    if (!product) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Product not found" });
    }

    res.status(STATUS_OK).json({ message: "success", product });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
