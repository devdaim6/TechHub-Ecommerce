import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { productId, userId } = await req.json();
    await connectMongoDB();

    const user = await User.findById(userId).select("wishlist");

    if (!user) {
      return NextResponse.json({
        message: "User not found.",
        success: false,
        status: 404,
      });
    }
    const isProductInWishlist = user?.wishlist?.filter((item) => {
      return item?.productId == productId;
    });
    if (isProductInWishlist.length > 0) {
      return NextResponse.json({
        message: "Product is Already in Wishlist.",
        success: false,
        status: 403,
      });
    }

    user.wishlist.push({
      productId,
    });
    await user.save();

    return NextResponse.json({
      message: "Product added to Wishlist.",
      success: true,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while adding the product to wishlist.",
      success: false,
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { productId, userId } = await req.json();
    await connectMongoDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        message: "User not found.",
        success: false,
        status: 404,
      });
    }

    // Check if the productId is in the wishlist
    const wishlistItemIndex = user.wishlist.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (wishlistItemIndex === -1) {
      return NextResponse.json({
        message: "Product not found in Wishlist.",
        success: false,
        status: 404,
      });
    }

    // Remove the item from the wishlist array
    user.wishlist.splice(wishlistItemIndex, 1);
    await user.save();

    return NextResponse.json({
      message: "Product removed from Wishlist.",
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while removing the product from wishlist.",
      success: false,
      status: 500,
    });
  }
}
