const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema(
  {
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer",
      required: true,
    },
    subscriptionType: {
      type: String,
      required: true,
    },
    subscriptionStarts: { type: Date, required: true },
    subscriptionEnds: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Subscribers = mongoose.model("Subscribers", SubscriberSchema);
module.exports = Subscribers;
