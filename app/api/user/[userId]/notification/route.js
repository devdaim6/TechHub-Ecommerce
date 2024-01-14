import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    const { notification } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    user.notificationPreferences.email = notification;
    await user.save();

    return NextResponse.json({
      message: "Notification Preference Updated",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred while updating Notification Preference.",
      success: false,
      status: 500,
    });
  }
}
