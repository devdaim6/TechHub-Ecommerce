"use client";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "sonner";
import axios from "axios";

const EmailVerification = () => {
  const { data: session } = useSession();

  const email = session?.session?.user?.email;
  const { data } = useEmailVerification(email);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const otp = form.get("otp");
    try {
      const response = await axios.post("/api/email-verification/verify-otp", {
        email,
        otp,
      });

      toast.success(response.data.message);

      if (response.data.success) {
        setTimeout(() => {
          router.back();
        }, 1500);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };
  return (
    <>
      {" "}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Verify Your Email</h1>
            <p className="py-4">
              Confirm your email to unlock a world of possibilities. Join a
              community that values your uniqueness. Your journey to a brighter
              future begins here!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form onSubmit={handleVerifyOtp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  disabled
                  name="email"
                  value={email}
                  placeholder="Your Email Address"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your OTP below</span>
                </label>
                <input
                  name="otp"
                  type="text"
                  placeholder="OTP"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-accent">Verify</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
