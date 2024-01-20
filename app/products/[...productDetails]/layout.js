export const generateMetadata = async ({ params }) => {
  let [name, productCode, productId] = params?.productDetails;

  return {
    title: `${decodeURIComponent(name)} | Tech Hub | You Dream We Design`,
    description: `Explore and purchase Product ${name} on Tech Hub. Find detailed information and shop with confidence.`,
    keywords: `product ${name}, tech gadgets, online shopping, Tech Hub`,
    author: "Tech Hub",
    url: `https://tech-hub-ak.vercel.app/products/${productCode}/${productId}`,
    type: "article",
    siteName: "techhub",
  };
};
export default function RootLayout({ children }) {
  return <>{children}</>;
}
