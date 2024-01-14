import { connectMongoDB } from "@/lib/db";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, message, image } = await req.json();
    await connectMongoDB();

    const existingQuery = await Contact.findOne({ email });
    if (existingQuery) {
      // If the contact exists, add the new query to the queries array
      existingQuery.queries.push({
        name,
        message,
        image,
      });

      await existingQuery.save();
    } else {
      await Contact.create({
        email,
        queries: [
          {
            name,
            message,
            image,
          },
        ],
      });
    }

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
