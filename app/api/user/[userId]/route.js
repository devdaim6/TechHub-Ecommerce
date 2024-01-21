import { connectMongoDB } from "@/lib/db";
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
    const cachedField = await redis.get(
      `user-${field ? field : "profile"}-${userId}`
    );
    if (cachedField) {
      const parsedField = JSON.parse(cachedField);
      return NextResponse.json(parsedField);
    }

    await connectMongoDB();
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
    
    if (field == "orders") {
      const ordersInDateRange = orders?.filter(
        (order) =>
          order?.createdAt >= new Date(startDate) &&
          order?.createdAt <= new Date(endDate)
      );
      await redis.setex(
        `user-orders-${userId}`,
        30,
        JSON.stringify(ordersInDateRange)
      );
      return NextResponse.json(ordersInDateRange);
    }
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
