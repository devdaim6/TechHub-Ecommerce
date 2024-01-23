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
      orderCode,
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


export async function PATCH(req) {
  try {
    const {
      userId,
      orderCode,
      cancellationReason,
      orderStatus,
      paymentStatus,
    } = await req.json();
    const { searchParams } = new URL(req.url);
    const cancelledBy = searchParams.get("cancelledBy");

    if (!orderStatus && !paymentStatus) {
      return NextResponse.json({
        message:
          "Invalid request. Please provide at least one of orderStatus or paymentStatus.",
        success: false,
        status: 400,
      });
    }

    if (!(userId && orderCode)) {
      return NextResponse.json({
        message: "Invalid request. Please provide both userId & orderCode.",
        success: false,
        status: 400,
      });
    }

    await connectMongoDB();

    const user = await User.findOne({ _id: userId }).select("name orders");

    const orderToUpdateInOrders = await Order.findOne({ orderCode });

    if (!user || !orderToUpdateInOrders) {
      return NextResponse.json({
        message: "User or Order not found",
        success: false,
        status: 404,
      });
    }

    const updatePromises = [];

    if (orderStatus) {
      const cancellationReasonText =
        cancelledBy === "admin"
          ? `Cancelled By Admin : ${cancellationReason}`
          : `Cancelled By User: ${user?.name}`;

      updatePromises.push(
        user.updateOne(
          {
            $set: {
              "orders.$[elem].orderCancellationReason":
                cancelledBy === "user"
                  ? "Cancelled By You"
                  : cancellationReasonText,
              "orders.$[elem].orderStatus": orderStatus,
            },
          },
          {
            arrayFilters: [{ "elem.orderCode": orderCode }],
          }
        )
      );

      updatePromises.push(
        orderToUpdateInOrders.updateOne({
          $set: {
            orderCancellationReason: cancellationReasonText,
            orderStatus,
          },
        })
      );
    }

    if (paymentStatus) {
      updatePromises.push(
        user.updateOne(
          {
            $set: {
              "orders.$[elem].paymentStatus": paymentStatus,
            },
          },
          {
            arrayFilters: [{ "elem.orderCode": orderCode }],
          }
        )
      );

      updatePromises.push(
        orderToUpdateInOrders.updateOne({
          $set: {
            paymentStatus,
          },
        })
      );
    }

    await Promise.all(updatePromises);

    return NextResponse.json({
      message: "Order updated successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while updating the order.",
      success: false,
      status: 500,
    });
  }
}
