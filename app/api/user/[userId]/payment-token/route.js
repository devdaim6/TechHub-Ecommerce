import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    const { userId } = params;
    console.log(userId);
    const { searchParams } = new URL(req.url);
    const field = searchParams.get("field");
    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    if (field == "verify-token") {
      const token = searchParams.get("token");
      if (!token) {
        return NextResponse.json({
          message: "Token not provided.",
          success: false,
          status: 401,
        });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_ORDER_TOKEN);

      if (decodedToken.userId !== user._id.toString()) {
        return NextResponse.json({
          message: "Request Timed Out.",
          success: false,
          status: 401,
        });
      }

      return NextResponse.json({
        message: "Token verification successful.",
        success: true,
        status: 200,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_ORDER_TOKEN, {
      expiresIn: "5m",
    });
    return NextResponse.json({
      token,
      message: "Token generated successfully.",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "Request failed.",
      success: false,
      status: 401,
    });
  }
}
