import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productCode: { type: String, unique: true, required: true },
    name: { type: String },
    description: { type: String },
    detailedDescription: { type: String },
    material: { type: String },
    price: { type: Number },
    category: { type: [String] },
    sizes: { type: Array },
    colors: { type: Array },
    shipping: { type: Boolean, default: false },
    onSale: { type: Boolean, default: true },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    imageUrl: { type: String },
    inStock: { type: Boolean, default: true },
    averageRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    starRatings: [
      { star: { type: Number }, ratings: { type: Number, default: 0 } },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, required: true },
        name: { type: String },
        comment: { type: String, default: "" },
        title: { type: String, default: "" },
        isReview: { type: Boolean, default: false },
        reviewCode: {
          type: String,
          default: () => randomstring.generate(),
          unique: true,
          required: true,
        },
        image: { type: String, default: "" },
        date: { type: Date, default: Date.now },
      },
    ],
    reviewsCount: { type: Number, default: 0 },

    featured: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },

    variants: [
      {
        size: { type: String },
        color: { type: String },
        price: { type: Number },
        imageUrl: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
