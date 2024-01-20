"use client";
import React from "react";

const RatingStars = ({ averageRating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 !== 0;

  const starElements = Array.from({ length: maxStars }, (_, index) => {
    const starClass =
      index < fullStars
        ? "text-yellow-500"
        : hasHalfStar && index === fullStars
        ? "text-yellow-500"
        : "text-gray-300";

    return (
      <span key={index} className={`text-2xl ${starClass}`}>
        ★
      </span>
    );
  });

  return <div className="flex">{starElements}</div>;
};

export default RatingStars;
