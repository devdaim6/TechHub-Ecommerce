import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import { sendMail } from "@/utils/sendMail";

const handler = async function POST(req) {
  const { email } = await req.json();

  await connectMongoDB();

  const findUser = await User.findOne({ email });
  if (!findUser) {
    return NextResponse.json({
      message: "No User Found with this Email",
      success: false,
    });
  }

  //send Mail to user

  const mailResponse = await sendMail(
    email,
    "recoverUsername",
    "",
    "",
    "",
    findUser?.username
  );

  if (!mailResponse)
    return NextResponse.json({
      message: "Error while Sending Mail.Try Again!",
      success: false,
    });

  return NextResponse.json({
    message: "Check your Mail",
    success: true,
  });
};

export { handler as POST };
