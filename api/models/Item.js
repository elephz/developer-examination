const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    quantity: Number,
    description : String
  },
  { timestamps: true }
);

module.exports = mongoose.model("item", itemSchema);