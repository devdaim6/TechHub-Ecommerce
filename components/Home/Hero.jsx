"use client";
import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getToken } from "@/utils/util";
import { loginUser } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
const Hero = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const fetchData = async () => {
    try {
      const token = await getToken();
      dispatch(
        loginUser({
          user: session?.session?.user,
          token: token?.value,
          status: status,
        })
      );
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  return (
    <div className="hero min-h-full bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Carousel />
        <div>
          <h1 className="text-4xl font-bold">
            Crafting Uniqueness <span className="hidden md:inline">:</span>{" "}
            Where Imagination Takes Flight!
          </h1>
          <p className="py-6">
            Welcome to TechHub! We personalize cups, engrave with precision, and
            print unique T-shirts. Frame your world stylishly with Vector
            Frames. Turn ordinary items into expressions of individuality.
            Unleash your creativity and transform moments into memories!
          </p>{" "}
          <Link href="/products">
            <button className="btn btn-accent uppercase text-gray-900 transition duration-300 ease-in-out hover:rounded-full hover:transition">
              Our Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
