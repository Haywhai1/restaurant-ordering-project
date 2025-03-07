const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Dish name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Appetizer",
        "Main Course",
        "Dessert",
        "Beverage",
        "Drinks",
        "Other",
      ],
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be greater than 0"],
    },
    image: {
      type: String,
      required: true, 
      default: "",
    },
    isAvailable: {
      type: Boolean,
      default: true, 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const MenuItem = mongoose.model("Menu", menuSchema);

module.exports = MenuItem;
