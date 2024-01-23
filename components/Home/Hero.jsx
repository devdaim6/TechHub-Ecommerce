"use client";
import Link from "next/link";
import Carousel from "./Carousel";
const Hero = () => {
 
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
