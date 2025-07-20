const { cloudinary } = require("../../config/cloudinary");
const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_CREATED,
} = require("../constants/httpStatusCodes");
const Products = require("../models/productModel");

module.exports.addProduct = async (req, res) => {
  try {
    let carData = req.body;

    carData.dealerId = req.user._id;

    carData.category = carData.category;
    carData.condition = carData.condition;
    const convertedImages = [];
    if (req.body.images.length > 0) {
      for (let image of req.body.images) {
        const imageResponse = await cloudinary.uploader.upload(image, {
          upload_preset: "cloudinary_react",
          public_id: `${Date.now()}_additional`,
        });
        convertedImages.push(imageResponse.url);
      }
    }
    carData.images = convertedImages;
    const resp = await Products.create(carData);
    res.status(STATUS_CREATED).json({
      message: "Product added",
      success: true,
      product: resp,
    });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
