import { connectMongoDB } from "@/lib/db";
import Product from "@/models/product";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { userId } = params;
    const { searchParams } = new URL(req.url);
    const field = searchParams.get("field");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);
    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    await connectMongoDB();
    const userProjection = field
      ? `${field}`
      : "-reviews -cart -savedAddresses -wishlist -orders";

    let user;
    if (field === "orders") {
      user = await User.findOne(
        {
          _id: userId,
          "orders.createdAt": {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
        "orders"
      ).lean();

      const ordersArray =
        user?.orders.filter(
          (order) =>
            order.createdAt >= startOfDay && order.createdAt <= endOfDay
        ) || [];
      const sortedOrdersArray = ordersArray.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      return NextResponse.json(sortedOrdersArray);
    } else {
      user = await User.findOne({ _id: userId }).select(userProjection);
    }

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    if (field == "wishlist") {
      const populatedWishlist = await Promise.all(
        user?.wishlist.map(async (wishlistItem) => {
          const productDetails = await Product.findById(
            wishlistItem.productId
          ).select("productCode name imageUrl price");
          return {
            ...wishlistItem.toObject(),
            productDetails,
          };
        })
      );
      return NextResponse.json(populatedWishlist);
    }

    return NextResponse.json(user?.[field] || user);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while fetching user.",
      success: false,
      status: 500,
    });
  }
}