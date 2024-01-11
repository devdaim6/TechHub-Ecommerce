"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ButtonLoading from "../ui/ButtonLoading";
const Login = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const handleLogin = async (e) => {
    try {
      setSubmitting(true);
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const username = form.get("username");
      const password = form.get("password");
      const res = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });
      console.log("signIn Response:", res); // Log the response
      if (res.error) {
        toast.error("Invalid Credentials");
      } else {
        toast.success("Logged In Successfully !");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="hero lg:min-h-screen min-h-full bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Welcome back!</h1>
            <p className="py-6">
              Log in for seamless access to a personalized platform. Whether
              exploring, collaborating, or creating, we&apos;ve got you covered.
              Your journey continues—unlock new opportunities with every login.
              Dive into a world tailored to your needs!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
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
                <button className="btn btn-accent">
                  {submitting ? (
                    <>
                      Logging in &nbsp;
                      <ButtonLoading />
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
