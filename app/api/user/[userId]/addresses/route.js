import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userId } = params;
    const { landmark, city, state, zipCode, name, phone } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }
    user.savedAddresses.push({ landmark, city, state, zipCode, name, phone });
    await user.save();

    return NextResponse.json({
      message: "Address Saved",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while Adding Address.",
      success: false,
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    const { landmark, city, state, zipCode, name, phone, addressId } =
      await req.json();

    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    const existingAddressIndex = user.savedAddresses.findIndex(
      (address) => address._id == addressId
    );

    if (existingAddressIndex === -1) {
      return NextResponse.json({
        message: "Address not found",
        success: false,
        status: 404,
      });
    }

    user.savedAddresses[existingAddressIndex] = {
      _id: user.savedAddresses[existingAddressIndex]._id, // Retain the existing _id
      landmark,
      city,
      state,
      zipCode,
      name,
      phone,
    };

    await user.save({ runValidators: true });

    return NextResponse.json({
      message: "Address updated",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while updating address.",
      success: false,
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = params;
    const { addressId } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    const existingAddressIndex = user.savedAddresses.findIndex(
      (address) => address._id == addressId
    );

    if (existingAddressIndex === -1) {
      return NextResponse.json({
        message: "Address not found",
        success: false,
        status: 404,
      });
    }

    user.savedAddresses.splice(existingAddressIndex, 1);

    await user.save();

    return NextResponse.json({
      message: "Address removed",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while removing address.",
      success: false,
      status: 500,
    });
  }
}
