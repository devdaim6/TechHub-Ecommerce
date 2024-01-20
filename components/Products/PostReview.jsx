"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  setReviewName,
  setReviewTitle,
  setReviewImage,
  setReviewComment,
  clearReview,
} from "@/features/reviews/reviewsSlice";
import RatingComponent from "../ui/Rating";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getBase64, getUserFromLocalStorage } from "@/utils/util";
import { toast } from "sonner";
const PostReview = ({ productId }) => {
  const router = useRouter();
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const reviewData = useSelector((state) => state.reviews);
  const handleSubmit = async () => {
    const response = await axios.post("/api/products/reviews", {
      name: reviewData?.name,
      title: reviewData?.title,
      image: reviewData?.image,
      comment: reviewData?.comment,
      rating: reviewData?.rating,
      productId,
      userId: user?.id,
    });
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      dispatch(clearReview());
      router.back();
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <div className="max-w-md mx-auto   p-8 rounded shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Your Name:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Your Name here"
          value={reviewData?.name}
          onChange={(e) => dispatch(setReviewName(e.target.value))}
          className="input input-bordered w-full  "
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rating:
        </label>
        <RatingComponent />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={reviewData?.title}
          onChange={(e) => dispatch(setReviewTitle(e.target.value))}
          placeholder="Title"
          className="input input-bordered w-full  "
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Comment:
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Comment/Description"
          name="comment"
          value={reviewData?.comment}
          onChange={(e) => dispatch(setReviewComment(e.target.value))}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Image:
        </label>
        <input
          type="file"
          name="image"
          value={reviewData?.Image}
          accept=".jpg, .png|image/*"
          onChange={async (e) =>
            dispatch(setReviewImage(await getBase64(e.target.files[0])))
          }
          className="file-input file-input-bordered w-full "
        />
      </div>
      <div
        className={user?.status !== "authenticated" ? "tooltip" : "w-full"}
        data-tip="Login Required"
      >
        <button
          onClick={handleSubmit}
          disabled={user?.status !== "authenticated"}
          className={`btn btn-block  btn-accent ${
            user?.status !== "authenticated" && "cursor-not-allowed"
          }`}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default PostReview;
