export const generateMetadata = async ({ params }) => {
  const { productCode } = params;
  return {
    title: `Tech Hub | ${productCode}`,
    description: `Explore and purchase Product ${productCode} on Tech Hub. Find detailed information and shop with confidence.`,
    keywords: `product ${productCode}, tech gadgets, online shopping, Tech Hub`,
    author: "Tech Hub",
    url: `https://tech-hub-ak.vercel.app/products/${productCode}`,
    type: "article",
    siteName: "Tech Hub",
  };
};
export default function RootLayout({ children }) {
  return <>{children}</>;
}
