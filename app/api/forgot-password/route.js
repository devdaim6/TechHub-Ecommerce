import Otp from "@/models/otp";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
import { sendMail } from "@/utils/sendMail";
import { sendOtpToMobile } from "@/utils/sendOtpToMobile";

const handler = async function POST(req) {
  const { email, phone, typeOfMessenger } = await req.json();

  await connectMongoDB();
  const findBy = typeOfMessenger === "phone" ? phone : email;
  const findUser = await User.findOne({ [typeOfMessenger]: findBy });
  if (!findUser) {
    return NextResponse.json({
      message: `No User Found with this ${typeOfMessenger}`,
      success: false,
    });
  }
  //delete otp from database if any previous otp is there
  await Otp.deleteOne({ email, type: "forgotPassword" });

  //generate new otp and save it to DB
  const otp = randomstring.generate({
    length: 4,
    charset: ["numeric"],
  });

  const hashedOtp = await bcryptjs.hash(otp, 10);
  const expirationTime = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({
    [typeOfMessenger]: findBy,
    otp: hashedOtp,
    type: "forgotPassword",
    createdAt: Date.now(),
    expiredAt: expirationTime,
  });

  //send Mail to user
  if (typeOfMessenger === "email") {
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
  }

  if (typeOfMessenger === "phone") {
    const response = await sendOtpToMobile(phone, otp);
    if (!response?.sid)
      return NextResponse.json({
        message: "Error while Sending Sms.Try Again!",
        success: false,
      });
  }
  return NextResponse.json({
    message: "Otp Sent",
    success: true,
  });
};

export { handler as POST };
