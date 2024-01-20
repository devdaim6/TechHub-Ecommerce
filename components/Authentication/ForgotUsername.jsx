"use client";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
const ForgotUsername = () => {
  const router = useRouter();
  const handleSendUserNameToMail = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const response = await axios.post("/api/recover/username", {
      email,
    });

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } else toast.error(response?.data?.message);
  };
  return (
    <>
      {" "}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Recover Your Account</h1>
            <p className="py-6">
              Lost access to your account? No worries! Enter your email below to
              recover your username securely.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form onSubmit={handleSendUserNameToMail} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="flex justify-between">
                <label className="label">
                  <Link
                    href="/forgot-password"
                    className="label-text-alt link link-hover  "
                  >
                    Forgot Password?
                  </Link>
                </label>
                <label className="label">
                  <Link
                    href="/forgot-email"
                    className="label-text-alt link link-hover  "
                  >
                    Forgot Email?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent">
                  Recover
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotUsername;
