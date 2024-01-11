import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});
const ProductSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    sizes: { type: Array },
    colors: { type: Array },
    shipping: { type: Boolean },
    onSale: { type: Boolean },
    priceDrop: { type: Number },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    dateAdded: { type: Date, default: Date.now },
    imageUrl: { type: String },
    inStock: { type: Boolean, default: true },
    averageRating: { type: Number, default: 0 },
    reviews: [ReviewSchema],
    tags: { type: [String] },
    featured: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
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
