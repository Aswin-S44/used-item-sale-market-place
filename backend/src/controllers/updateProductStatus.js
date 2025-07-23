const {
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_INTERNAL_SERVER_ERROR,
} = require("../constants/httpStatusCodes");
const Products = require("../models/productModel");

module.exports.updateProductStatus = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Product not found" });
    }

    await Products.updateOne(
      { _id: productId },
      { $set: { status: req.body.status } }
    );

    return res.status(STATUS_OK).json({ message: "Product status updated" });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
