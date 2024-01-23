"use client";
import { useUser } from "@/hooks/useUser";
import { getUserFromLocalStorage } from "@/utils/util";
import axios from "axios";
import Link from "next/link";
import ScreenLoading from "../ui/ScreenLoading";
import { useMemo, useState } from "react";

const UserProfilePage = () => {
  const user = getUserFromLocalStorage();
  const { data, isLoading, refetch } = useUser(user?.id);
  const [notifications, setNotifications] = useState(null);
  useMemo(() => setNotifications(data?.notificationPreferences?.email), [data]);

  const handleChangePreferences = async (isChecked) => {
    try {
      const response = await axios.patch(
        `/api/user/${data?._id}/notification`,
        {
          notification: isChecked,
        }
      );
      refetch();
      console.log(response?.data);
    } catch (error) {
      console.error("Error updating notification preferences:", error);
    }
  };
  
  if (isLoading || !user?.isLoggedIn) {
    return (
      <>
        <ScreenLoading
          upperText={"Your Profile is being Loaded."}
          lowerText={`Please wait a moment ...`}
        />
      </>
    );
  }
  return (
    <>
      {!isLoading && data && (
        <div className="my-5 min-h-screen bg-background ">
          <div className=" flex-col   ">
            <div className="text-center mt-2 py-1 text-left">
              <h1 className="text-3xl font-bold">
                <div className="divider">{data?.name}</div>
              </h1>
            </div>
            <div className="card shrink-0 lg:w-screen min-w-full max-w-3xl shadow-2xl bg-base-100">
              <form className="card-body">
                <img
                  src={data?.image}
                  alt="image"
                  className="mx-auto border rounded-full w-24 h-24 "
                />
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      disabled
                      type="text"
                      value={data?.name}
                      placeholder="Full Name"
                      className="input input-bordered "
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                      <span
                        className={`badge badge-${
                          data?.isVerified ? "accent" : "error"
                        } badge-outline `}
                      >
                        {data?.isVerified ? (
                          "Verified"
                        ) : (
                          <>
                            <Link
                              href="/profile/email-verification"
                              className=" "
                            >
                              verify ?
                            </Link>
                          </>
                        )}
                      </span>
                    </label>
                    <input
                      disabled
                      type="email"
                      value={data?.email}
                      placeholder="Email"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      disabled
                      type="tel"
                      value={data?.phone}
                      placeholder="Phone"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      disabled
                      type="text"
                      value={data?.username}
                      placeholder="Username"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      disabled
                      type="password"
                      value={data?.password}
                      placeholder="Password"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <div className="flex gap-x-4">
                      <span>Notification Preferences</span>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setNotifications(isChecked);
                          handleChangePreferences(isChecked);
                        }}
                        className="mt-1 toggle toggle-success"
                        value={
                          data?.notificationPreferences?.email ? "on" : "off"
                        }
                        checked={notifications}
                      />
                    </div>
                  </div>
                </div>{" "}
                <div className="form-control mt-6"></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
