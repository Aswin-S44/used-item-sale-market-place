const mongoose = require("mongoose");
const {
  PRODUCT_CATEGORY_TYPES,
  PRODUCT_CONDITION_TYPES,
  PRODUCT_STATUS_TYPES,
} = require("../constants/constant");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: Object.values(PRODUCT_CATEGORY_TYPES),
    },
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "Dealer",
    },
    condition: {
      type: String,
      enum: Object.values(PRODUCT_CONDITION_TYPES),
      required: true,
    },
    usedDuration: {
      type: String,
      required: () => {
        return this.condition === PRODUCT_CONDITION_TYPES.USED;
      },
    },
    askingRate: { type: String, required: true },
    isNegotiable: { type: Boolean, default: false },
    images: [],
    description: { type: String, required: true },
    location: { type: String, required: true },
    postedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS_TYPES),
      default: "available",
    },
    views: { type: Number, default: 0 },
    warrantyAvailable: { type: Boolean, default: false },
    features: [],
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;
