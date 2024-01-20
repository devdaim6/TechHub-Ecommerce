"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviewRating } from "@/features/reviews/reviewsSlice";
const RatingComponent = () => {
  const dispatch = useDispatch();
  const reviewData = useSelector((state) => state.reviews);

  const handleRatingChange = (rating) => {
    dispatch(setReviewRating(parseInt(rating)));
  };
  return (
    <div className="rating rating-md">
      {[1, 2, 3, 4, 5].map((rating) => (
        <input
          key={rating}
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          defaultChecked={rating === reviewData.rating}
          onChange={() => handleRatingChange(rating)}
        />
      ))}
    </div>
  );
};

export default RatingComponent;
