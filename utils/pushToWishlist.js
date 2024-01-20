import axios from "axios";

export const handleAddToWishlist = async (productid, userId) => {
  try {
    const res = await axios.post("/api/products/wishlist", {
      productid,
      userId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
