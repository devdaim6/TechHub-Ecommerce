import PostReview from "@/components/Products/PostReview";

const page = ({ params }) => {
  return (
    <>
      <PostReview productId={params?.productId} />
    </>
  );
};

export default page;
