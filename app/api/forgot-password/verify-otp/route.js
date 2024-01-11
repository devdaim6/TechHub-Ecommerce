import { connectMongoDB } from "@/lib/db";
import Otp from "@/models/otp";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

const handler = async function POST(req) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const { findBy, otp, option, newPassword } = data;

    if (!findBy && otp) {
      throw Error("provide values for email , otp");
    }
    const findUser = await User.findOne({ [option]: findBy });
    if (!findUser) {
      return NextResponse.json({
        message: "No User Found with this Email",
        success: false,
      });
    }

    //ensuring otp is correct
    const matchedOtpRecord = await Otp.findOne({
      [option]: findBy,
      type: "forgotPassword",
    });

    if (!matchedOtpRecord) {
      return NextResponse.json({
        message: "Request for an OTP first!",
        success: false,
      });
    }
    const { expiredAt } = matchedOtpRecord;

    if (Date.now() > expiredAt) {
      await Otp.deleteOne({ [option]: findBy, type: "forgotPassword" });
      return NextResponse.json({
        message: "Otp Expired.Request New One.",
        success: false,
      });
    }

    const newHashedPassword = await bcryptjs.hash(newPassword, 10);
    const hashedOtp = matchedOtpRecord.otp;
    const validOtp = await bcryptjs.compare(otp, hashedOtp);
    if (!validOtp) {
      return NextResponse.json({
        message: "Otp is Incorrect",
        success: false,
      });
    }

    await User.updateOne(
      { [option]: findBy },
      {
        $set: {
          password: newHashedPassword,
        },
      },
      { new: true }
    );
    await Otp.deleteOne({ [option]: findBy, type: "forgotPassword" });

    return NextResponse.json({
      message: "Otp Verified",
      result: "Password Changed Successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Otp Verification Failed",
      success: false,
    });
  }
};

export { handler as POST };
