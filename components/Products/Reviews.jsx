"use client";
import { useProducts } from "@/hooks/useProduct";
import React, { useEffect, useState } from "react";
import RatingStars from "../ui/RatingStars";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const Reviews = ({
  productId,
  averageRating,
  totalRating,
  starRatings,
  reviewsCount,
}) => {
  const { data, isLoading } = useProducts("reviews", productId);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const loadMoreReviews = () => {
    setReviewsToShow((prevReviews) => prevReviews + 3);
  };
  const sumOfRatings = starRatings?.reduce(
    (total, starRating) => total + starRating?.ratings,
    0
  );
  useEffect(() => {
    if (starRatings && starRatings.length > 0) {
      const distribution = Array(5).fill(0);
      starRatings.reverse().forEach((starRating) => {
        const starIndex = starRating.star - 1;
        distribution[starIndex] = starRating.ratings;
      });

      setRatingDistribution(distribution.reverse());
    }
  }, [starRatings, totalRating]);
  return (
    <div className="reviews-container">
      <h2 className="text-2xl font-semibold mb-4">
        <div class="divider">Customer Reviews</div>
      </h2>
      <div className="flex gap-x-2 items-center">
        <RatingStars averageRating={averageRating} />
        <p>
          <span>{averageRating?.toFixed(1)}</span>
          <span> out of </span>
          <span>5</span>
        </p>
      </div>
      <p>
        <span className="text-primary"> {totalRating}</span>{" "}
        <span>Global Ratings</span>
      </p>
      <div className="mt-4">
        {[5, 4, 3, 2, 1].map((stars, index) => (
          <div key={stars} className="flex items-center mt-2">
            <a
              href={`#`}
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              {stars} star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-300 rounded"
                style={{
                  width: `${(ratingDistribution[index] / sumOfRatings) * 100}%`,
                }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {((ratingDistribution[index] / sumOfRatings) * 100).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <div className="text-sm my-4">
        {totalRating} total ratings & {reviewsCount} with reviews.
      </div>
      <div className="divider"></div>
      {data?.slice(0, reviewsToShow).map((review) => (
        <div key={review.reviewCode} className="review-item">
          <div className="flex items-center  ">
            <p className="text-lg font-semibold mr-2">{review?.name}</p>
            <div className="flex items-center">
              <RatingStars averageRating={review?.rating} />
              <p className="text-md ml-1">{review?.rating}</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-2">
            {new Date(review?.date).toLocaleString()}
          </p>
          {review?.image && (
            <img
              src={review?.image}
              alt="review Image"
              className="max-w-24 w-24 max-h-24 h-24"
            />
          )}
          <p className="text-neutral-content text-lg font-semibold">
            {review?.title}
          </p>
          <p className="text-neutral-content text-sm">{review?.comment}</p>
          <div className="divider"></div>
        </div>
      ))}
      {data && data.length > reviewsToShow && (
        <div className="flex justify-center my-4">
          <button className="btn btn-primary btn-sm" onClick={loadMoreReviews}>
            Load More
          </button>
        </div>
      )}
      {data?.length === 0 && (
        <p className="p-4">No reviews available... Be The First to Review</p>
      )}
      <button className="btn btn-accent btn-block">
        <Link
          href={`/products/reviews/${productId}/post`}
          className="flex justify-between w-full"
        >
          <span>Write a review</span>
          <ArrowRightIcon className="pb-1" />
        </Link>
      </button>
    </div>
  );
};

export default Reviews;
