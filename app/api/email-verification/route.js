import Otp from "@/models/otp";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
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
  if (findUser?.isVerified) {
    return NextResponse.json({
      message: "Email is Already verified",
      success: false,
      status: 403,
    });
  }
  //delete otp from database if any previous otp is there
  await Otp.deleteOne({ email, type: "verification" });

  //generate new otp and save it to DB
  const otp = randomstring
    .generate({
      length: 4,
      charset: ["numeric"],
    })
    .toString();
  const hashedOtp = await bcryptjs.hash(otp, 10);
  const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
  await Otp.create({
    email,
    otp: hashedOtp,
    type: "verification",
    createdAt: Date.now(),
    expiredAt: expirationTime,
  });

  //send Mail to user

  const mailResponse = await sendMail(
    email,
    "otp",
    otp,
    expirationTime,
    "",
    findUser?.username
  );

  if (!mailResponse)
    return NextResponse.json({
      message: "Error while Sending Mail.Try Again!",
      success: false,
    });

  return NextResponse.json({
    message: "Otp Sent to your mail",
    success: true,
  });
};

export { handler as POST };
