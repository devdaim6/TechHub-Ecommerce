export const generateMetadata = async ({ params }) => {
  const { productId } = params;

  return {
    title: "Add Your Review | Tech Hub | You Dream, We Design",
    description:
      "Share your thoughts and experiences by adding a review on Tech Hub. Help others make informed decisions and contribute to our community.",
    keywords: "product review, user feedback, Tech Hub, customer review",
    author: "Tech Hub",
    url: `https://tech-hub-ak.vercel.app/products/reviews/${productId}/post`,
    type: "article",
    siteName: "techhub",
  };
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
