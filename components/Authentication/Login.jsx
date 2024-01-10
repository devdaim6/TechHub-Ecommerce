"use client";
import React from "react";
import Link from "next/link";
const Login = () => {
  return (
    <>
      <div className="hero lg:min-h-screen min-h-full bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Welcome back!</h1>
            <p className="py-6">
              Reconnect to your personalized space with just a click. Log in to
              experience seamless access to a platform crafted for you. Whether
              you&apos;re here to explore, collaborate, or create, we&apos;ve
              got your back. Your journey continues, and we&apos;re excited to
              have you on board. Let&apos;s make every login a step towards
              unlocking new opportunities and possibilities. Login now and dive
              into a world tailored to your needs!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link
                    href="/auth/forgot-password"
                    className="label-text-alt link link-hover  "
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
