const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Products = require("../models/productModel");

module.exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Product not found" });
    }

    await Products.deleteOne({ _id: productId });
    return res.status(STATUS_OK).json({ message: "Product deleted" });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
