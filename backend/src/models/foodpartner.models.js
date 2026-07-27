const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    OwnerName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const foodPartnerModel = mongoose.model("foodpartner", foodPartnerSchema);
module.exports = foodPartnerModel;