import React from "react";
import Carousel from "./Carousel";
import Link from "next/link";
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
            Welcome to TechHub - where creativity meets craftsmanship! Elevate
            your everyday with our personalized printing and engraving services.
            Customize cups with cherished memories, embrace precision with laser
            engraving on various materials, and wear your uniqueness with our
            T-shirt printing. Frame your world in style with our Vector Frames.
            At Techhub, we turn ordinary items into extraordinary expressions of
            individuality. Explore a realm of possibilities and transform
            moments into memories. Unleash your creativity today!
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
