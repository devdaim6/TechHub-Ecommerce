import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/utils/sendMail";

export async function POST(req) {
  try {
    const { username, email, password, name, phone, image } = await req.json();
    await connectMongoDB();

    // Check if email or username already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({
        message: "Email is already taken",
        status: 403,
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json({
        message: "Username is already taken",
        status: 403,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      image,
    });
    const sendingMail = await sendMail(email, "account", "", "", "", username);
    if (!sendingMail) {
      return NextResponse.json({
        message: "Account created but failed to send the Mail",
        description: "You can Login now and Verify your Account later",
        status: 402,
      });
    }
    return NextResponse.json({
      message: "Account created",
      description: "You can Login now",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
