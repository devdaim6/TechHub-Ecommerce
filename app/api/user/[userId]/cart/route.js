import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { userId } = params;
  const { productId, quantity } = await req.json();
  try {
    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }
    const existingCartItem = user.cart.find(
      (item) => item.productId == productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;

      await user.save();

      return NextResponse.json({
        message: "Item already in Cart, quantity updated",
        success: true,
      });
    }

    user.cart.push({
      productId,
      quantity,
    });

    await user.save();

    return NextResponse.json({
      message: "item Added To Cart",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while Adding item to cart.",
      success: false,
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    const { productId, quantity } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    const existingCartItem = user.cart.find(
      (item) => item.productId == productId
    );

    if (!existingCartItem) {
      return NextResponse.json({
        message: "Item not found in Cart",
        success: false,
        status: 404,
      });
    }

    if (quantity > 0) {
      existingCartItem.quantity = quantity;
    } else {
      user.cart = user.cart.filter((item) => item.productId != productId);
    }

    await user.save();

    const { cart } = user.toObject();

    return NextResponse.json({
      message: "Cart item updated",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while updating cart item.",
      success: false,
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = params;
    const { productId } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    const existingCartItemIndex = user.cart.findIndex(
      (item) => item.productId == productId
    );

    if (existingCartItemIndex === -1) {
      return NextResponse.json({
        message: "Item not found in Cart",
        success: false,
        status: 404,
      });
    }
    user.cart.splice(existingCartItemIndex, 1);

    await user.save();

    const { cart } = user.toObject();

    return NextResponse.json({
      message: "Cart item removed",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while removing cart item.",
      success: false,
      status: 500,
    });
  }
}
