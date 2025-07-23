const { cloudinary } = require("../../config/cloudinary");
const {
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_INTERNAL_SERVER_ERROR,
} = require("../constants/httpStatusCodes");
const Dealer = require("../models/dealerModel");

module.exports.updateProfile = async (req, res) => {
  try {
    const dealerId = req.user._id;
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) {
      return res.status(STATUS_NOT_FOUND).json({ message: "Dealer not found" });
    }
    const updatedData = req.body;

    if (req.body.profileImage) {
      const imageResponse = await cloudinary.uploader.upload(
        req.body.profileImage,
        {
          upload_preset: "cloudinary_react",
          public_id: `${Date.now()}_additional`,
        }
      );
      updatedData.profileImage = imageResponse.url;
    }

    await Dealer.updateOne({ _id: dealerId }, { $set: updatedData });

    return res.status(STATUS_OK).json({ message: "Profile updated" });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
