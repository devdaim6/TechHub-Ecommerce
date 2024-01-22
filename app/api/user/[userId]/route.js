import { connectMongoDB } from "@/lib/db";
import Product from "@/models/product";
import User from "@/models/user";
import { redis } from "@/utils/redis";
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
    if (field === "orders") {
      const user = await User.findOne(
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
    }
    const cachedField = await redis.get(
      `user-${field ? field : "profile"}-${userId}`
    );
    if (cachedField) {
      const parsedField = JSON.parse(cachedField);
      return NextResponse.json(parsedField);
    }
    if (field === "wishlist") {
      const user = await User.findOne({ _id: userId }).select("wishlist");
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

      await redis.setex(
        `user-${"wishlist"}-${userId}`,
        30,
        JSON.stringify(populatedWishlist)
      );

      return NextResponse.json(populatedWishlist);
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }
    const { orders, wishlist, savedAddresses, cart, reviews, ...restUser } =
      user.toObject();

    if (field) {
      const selectedField = user[field];
      await redis.setex(
        `user-${field ? field : "profile"}-${userId}`,
        30,
        JSON.stringify(selectedField)
      );
      return NextResponse.json(selectedField);
    }

    return NextResponse.json(restUser);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while fetching user.",
      success: false,
      status: 500,
    });
  }
}
