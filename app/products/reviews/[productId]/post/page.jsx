import PostReview from "@/components/Products/PostReview";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <PostReview productId={params?.productId} />
    </>
  );
};

export default page;
