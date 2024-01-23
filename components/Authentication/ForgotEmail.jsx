"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const ForgotEmail = () => {
  const router=useRouter()

  const handleSendUEmailToMail = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username");
    const response = await axios.post("/api/recover/email", {
      username,
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
              Lost access to your account? No worries! Enter your username below
              to recover your email securely.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form onSubmit={handleSendUEmailToMail} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Username"
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
                    href="/forgot-username"
                    className="label-text-alt link link-hover  "
                  >
                    Forgot Username?
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

export default ForgotEmail;
