import React from "react";

const ForgotPassword = () => {
  return (
    <>
      {" "}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Recover Your Account</h1>
            <p className="py-6">
              Oops, seems like you&apos;ve misplaced your access. No worries, we&apos;re
              here to help! Enter your email address below, and we'll guide you
              through the steps to reset your password. Your security is our
              priority, ensuring a seamless and secure process. Retrieve access
              to your account effortlessly, and get back to exploring the
              possibilities that await. We&apos;re here to assist you on your
              journey—let&apos;s get started on the path to account recovery!
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
                  placeholder="Your Email Address"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-accent">
                  Send Verification Code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
