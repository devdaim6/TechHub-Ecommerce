"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const ForgotPassword = () => {
  const router = useRouter();
  const [verifyWithOtp, setVerifyWithOtp] = useState(false);
  const [selectedOption, setSelectedOption] = useState("email");
  const [value, setvalue] = useState();

  useEffect(() => {
    setSelectedOption(localStorage.getItem("option"));
    setvalue(localStorage.getItem(selectedOption));
  }, [selectedOption]);

  const setFunctionToExecute = async (e) => {
    try {
      if (verifyWithOtp) {
        await handleVerifyOtpToResetPassword(e);
      } else {
        await handleSendOtpToResetPassword(e);
      }
    } catch (error) {
      console.error("Error executing function:", error);
      toast.error("An error occurred while processing the request.");
    }
  };

  const handleVerifyOtpToResetPassword = async (e) => {
    try {
      e.preventDefault();
      const { otp, password } = new FormData(e.currentTarget);
      const emailOrPhone = new FormData(e.currentTarget).get(selectedOption);

      const response = await axios.post("/api/forgot-password/verify-otp", {
        findBy: emailOrPhone,
        otp,
        option: selectedOption,
        newPassword: password,
      });

      toast.success(response.data.message);

      if (response.data.success) {
        localStorage.setItem(selectedOption, "");
        setTimeout(() => {
          router.back();
        }, 1500);
        setTimeout(() => {
          setVerifyWithOtp(false);
        }, 1400);
      }
    } catch (error) {
      console.error("Error verifying OTP for password reset:", error);
      toast.error("An error occurred while verifying OTP for password reset.");
    }
  };

  const handleSendOtpToResetPassword = async (e) => {
    try {
      e.preventDefault();
      const emailOrPhone = new FormData(e.currentTarget).get(selectedOption);

      const response = await axios.post("/api/forgot-password", {
        [selectedOption]: emailOrPhone,
        typeOfMessenger: selectedOption,
      });

      toast.success(response.data.message);

      if (response.data.status === 403) {
        setTimeout(() => {
          router.back();
        }, 1000);
      }

      if (response.data.success) {
        setVerifyWithOtp(true);
      }
    } catch (error) {
      console.error("Error sending OTP for password reset:", error);
      toast.error("An error occurred while sending OTP for password reset.");
    }
  };
  const handleOptionChange = (option) => {
    localStorage.setItem("option", option);
    setSelectedOption(option);
  };

  return (
    <>
      {" "}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Recover Your Account</h1>
            <p className="py-6">
              Lost access to your account? No worries! Enter your email or phone
              below to reset your password securely.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form onSubmit={setFunctionToExecute} className="card-body">
              {!verifyWithOtp && (
                <div className="flex">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-accent"
                        checked={selectedOption === "email"}
                        onChange={() => handleOptionChange("email")}
                      />
                      <span className="label-text">Email</span>
                    </label>
                  </div>{" "}
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-accent"
                        checked={selectedOption === "phone"}
                        onChange={() => handleOptionChange("phone")}
                      />
                      <span className="label-text">Phone</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    {selectedOption === "email" ? "Email" : "Phone"}
                  </span>
                </label>
                <input
                  onChange={(e) => {
                    localStorage.setItem(selectedOption, e.target.value);
                    setvalue(e.target.value);
                  }}
                  type={selectedOption === "email" ? "email" : "tel"}
                  name={selectedOption}
                  placeholder={`Your ${
                    selectedOption === "email" ? "Email" : "Mobile Number"
                  }`}
                  className={`input input-bordered ${
                    verifyWithOtp && "opacity-75 cursor-not-allowed"
                  }`}
                  value={value}
                  required
                  readOnly={verifyWithOtp}
                />
              </div>
              {verifyWithOtp && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Enter you OTP Below</span>
                    </label>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Your OTP"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">New Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Your New Password"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <label className="label">
                  <Link
                    href="/forgot-username"
                    className="label-text-alt link link-hover  "
                  >
                    Forgot Username?
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
                <button className="btn btn-accent">
                  {verifyWithOtp ? "Reset Password" : "Send Verification Code"}
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
