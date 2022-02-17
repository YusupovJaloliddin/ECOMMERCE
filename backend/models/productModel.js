const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Iltimos, mahsulot nomini kiriting"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Iltimos, mahsulot tavsifini kiriting"],
  },
  price: {
    type: Number,
    required: [true, "Iltimos, mahsulot narxini kiriting"],
    maxlength: [8, "Narx 8 belgidan oshmasligi kerak"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Iltimos maxsulotni kategoriyasini kiriting"],
  },
  Stock: {
    type: String,
    required: [true, "Iltimos, mahsulot zaxirasini kiriting"],
    maxlength: [4, "zaxira 4 belgidan oshmasligi kerak"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
