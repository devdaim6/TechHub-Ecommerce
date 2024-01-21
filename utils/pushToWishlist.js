import axios from "axios";

export const handleAddToWishlist = async (productId, userId) => {
  try {
    const res = await axios.post("/api/products/wishlist", {
      productId,
      userId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
