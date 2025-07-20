const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Products = require("../models/productModel");

module.exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Product not found" });
    }

    //TODO: Need to check how to update image

    // if (req.body?.images?.length !== product.images?.length) {

    // }

    await Products.updateOne({ _id: productId }, { $set: req.body });

    return res.status(STATUS_OK).json({ message: "Product updated" });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
