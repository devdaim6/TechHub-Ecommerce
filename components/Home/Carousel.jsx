"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const slides = [
    {
      slideNumber: 1,
      href: `/products/Printed Mug ,Ceremic ,300ml ,Tea ,Coffee/techhub-jfGx5jn5LvcmkXLYzmlg0cEbn0XHbvyE/65a817a2c0f2d28749efedad`,
      src: "https://images.unsplash.com/photo-1614940403522-a8c829e7eb82?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVnc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      slideNumber: 2,
      href: `/products/`,
      src: "https://images.unsplash.com/photo-1497223830540-5c1202d4f260?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdvb2R3b3Jrc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      slideNumber: 3,
      href: `/products/`,
      src: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      slideNumber: 4,
      href: `/products/`,
      src: "https://images.unsplash.com/photo-1570993492881-25240ce854f4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGZyYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide % slides.length) + 1;
      setCurrentSlide(nextSlide);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentSlide, slides?.length]);

  return (
    <div className="carousel carousel-center  lg:w-[50rem] p-4 space-x-4 bg-neutral rounded-box">
      {slides?.map((slide) => (
        <div
          key={slide?.slideNumber}
          id={`slide${slide?.slideNumber}`}
          className={`carousel-item relative w-full ${
            currentSlide === slide?.slideNumber ? "visible" : "hidden"
          }`}
        >
          <Link href={slide?.href}>
            <img
              alt={slide?.slideNumber}
              src={slide?.src}
              className="w-[25rem] h-[20rem]"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
