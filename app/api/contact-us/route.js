import {connectMongoDB} from "@/lib/db";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, message, image } = await req.json();
    await connectMongoDB();
    await Contact.create({
      name: name,
      email: email,
      message: message,
      image: image,
    });

    return NextResponse.json({
      message: "Query Submitted.",
      success: true,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while Submitting the Query.",
      success: false,
      status: 500,
    });
  }
}
