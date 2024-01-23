"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ButtonLoading from "../ui/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndLoginUser, loginUser } from "@/features/user/userSlice";
const Login = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

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
      if (res.error) {
        console.log(res.error);
        toast.error("Invalid Credentials");
      } else {
        toast.success("Logged In Successfully !");
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(loginUser(session?.session?.user));
      router.push("/");
    }
  }, [submitting]);

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
                    href="/forgot-password"
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
