// StarRating.js

import React from "react";

const StarRating = ({ rating }) => {
  const maxStars = 5;

  const calculateStarClass = (index) => {
    if (index < Math.floor(rating)) {
      return "bg-yellow-500 mask mask-star-2";
    } else if (index === Math.floor(rating) && rating % 1 !== 0) {
      if (rating % 1 <= 0.5)
        return "bg-yellow-500 mask mask-star-2 mask-half-1 ";
      else if (rating % 1 > 0.5)
        return "bg-yellow-500 mask mask-star-2 mask-half-1  ";
    } else {
      return "bg-white mask mask-star-2";
    }
  };

  return (
    <div className="rating rating-sm rating-half">
      {Array.from({ length: maxStars }).map((_, index) => (
        <input
          key={index}
          disabled
          name={`rating-${maxStars}`}
          className={calculateStarClass(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
