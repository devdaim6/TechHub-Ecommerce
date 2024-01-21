import { connectMongoDB } from "@/lib/db";
import Order from "@/models/orders";
import User from "@/models/user";
import { sendMail } from "@/utils/sendMail";
import { NextResponse } from "next/server";
import randomstring from "randomstring";
export async function POST(req) {
  try {
    const {
      userId,
      orderItems,
      totalAmount,
      isShippingFree,
      paymentId,
      paymentOption,
      paymentStatus,
      pickUpAtStore,
      orderStatus,
      shippingAddress,
    } = await req.json();
    const orderCode =
      "techhub-" +
      randomstring.generate(5) +
      "-" +
      randomstring.generate({
        charset: "numeric",
        length: 6,
      });

    await connectMongoDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }
    const orderDetails = {
      userId,
      orderCode,
      orderItems,
      totalAmount,
      isShippingFree,
      orderStatus: "processing",
      paymentId,
      pickUpAtStore,
      paymentOption,
      paymentStatus: pickUpAtStore ? "pending" : "paid",
      shippingAddress,
    };
    const order = new Order(orderDetails);

    user.orders.push({
      orderItems,
      totalAmount,
      paymentOption,
      isShippingFree,
      pickUpAtStore,
      paymentStatus: pickUpAtStore ? "pending" : "paid",
      orderStatus: "processing",
      shippingAddress,
    });
    await user.save();
    await order.save();

    await sendMail(user?.email, "order", "", "", orderCode, user?.username);

    return NextResponse.json({
      message: "Order Placed",
      success: true,
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while placing the order.",
      success: false,

      status: 500,
    });
  }
}
