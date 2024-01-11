"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
const EmailVerificationWithEmail = () => {
  const router = useRouter();
  const [verifyWithOtp, setVerifyWithOtp] = useState(false);
  const [email, setEmail] = useState("");

  const setFunctionTOExecute = (e) => {
    if (verifyWithOtp) {
      handleVerifyOtp(e);
    } else {
      handleSendOtpVerificationEmail(e);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const otp = form.get("otp");
    const response = await axios.post("/api/email-verification/verify-otp", {
      email,
      otp,
    });

    toast.success(response.data.message);
    if (response.data.success) {
      setTimeout(() => {
        router.back();
      }, 1500);
      setTimeout(() => {
        setVerifyWithOtp(false);
      }, 1400);
    }
  };
  const handleSendOtpVerificationEmail = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const response = await axios.post("/api/email-verification", {
      email,
    });

    toast.success(response.data.message);
    if (response.data.status === 403) {
      setTimeout(() => {
        router.back();
      }, 1000);
    }
    if (response.data.success) setVerifyWithOtp(true);
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
            <form onSubmit={setFunctionTOExecute} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  disabled={verifyWithOtp}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="input input-bordered"
                  required
                />
              </div>
              {verifyWithOtp && (
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
              )}

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent">
                  {verifyWithOtp ? "Verify" : "Send OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationWithEmail;
