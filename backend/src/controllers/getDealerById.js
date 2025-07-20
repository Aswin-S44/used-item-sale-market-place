const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Dealer = require("../models/dealerModel");

module.exports.getDealerById = async (req, res) => {
  try {
    const dealerId = req.params.id || req.user._id;
    const dealer = await Dealer.findById(dealerId);

    if (!dealer) {
      return res.status(STATUS_NOT_FOUND).json({ message: "Dealer not found" });
    }

    res.status(STATUS_OK).json({ message: "success", dealer });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
