const mongoose = require("mongoose");
const { SUBSCRIPTION_TYPES } = require("../constants/constant");

const DealerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    isDeactivated: { type: Boolean, default: false },
    profileImage: { type: String },
    totalListings: { type: Number, default: 0 },
    lastLoggedIn: { type: String, default: Date.now() },
    subscriptionType: {
      type: String,
      enum: [
        SUBSCRIPTION_TYPES.FREE,
        SUBSCRIPTION_TYPES.PRO,
        SUBSCRIPTION_TYPES.ELITE,
      ],
      default: SUBSCRIPTION_TYPES.FREE,
    },
    deactivatedDate: { type: String },
  },
  {
    timestamps: true,
  }
);

const Dealer = mongoose.model("Dealer", DealerSchema);
module.exports = Dealer;
