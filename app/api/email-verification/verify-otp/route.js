import { connectMongoDB } from "@/lib/db";
import Otp from "@/models/otp";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

const handler = async function POST(req) {
  try {
    await connectMongoDB();
    const { email, otp } = await req.json();
    if (!(email && otp)) {
      throw Error("provide values for email , otp");
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json({
        message: "No User Found with this Email",
        success: false,
      });
    }

    //ensuring otp is correct
    const matchedOtpRecord = await Otp.findOne({ email, type: "verification" });

    if (!matchedOtpRecord) {
      return NextResponse.json({
        message: "Request for an OTP first!",
        success: false,
      });
    }
    const { expiredAt } = matchedOtpRecord;
    
    if (Date.now() > expiredAt) {
      await Otp.deleteOne({ email, type: "verification" });
      return NextResponse.json({
        message: "Otp has Expired.Request for a New One.",
        success: false,
      });
    }

    const hashedOtp = matchedOtpRecord.otp;
    const validOtp = await bcryptjs.compare(otp, hashedOtp);

    if (!validOtp) {
      return NextResponse.json({
        message: "Otp Verification Failed",
        success: false,
      });
    }
    await User.updateOne(
      { email },
      {
        $set: {
          isVerified: true,
        },
      },
      { new: true }
    );

    await Otp.deleteOne({ email, type: "verification" });
    return NextResponse.json({
      message: "Otp Verified",
      result: "User Verified !",
      success: true,
    });
  } catch (error) {
    throw error;
  }
};

export { handler as POST };
