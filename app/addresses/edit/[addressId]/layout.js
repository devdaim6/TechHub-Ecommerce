export const generateMetadata = async ({ params }) => {
  return {
    title: `Edit Address | Tech Hub | You Dream We Design`,
    description:
      "Edit and update your saved address on Tech Hub. Make changes to your shipping information for a seamless shopping experience.",
    keywords: "edit address, update address, shipping information, Tech Hub",
    author: "Tech Hub",
    url: `https://tech-hub-ak.vercel.app/addresses/edit/${params?.addressId}`,
    type: "article",
  };
};
export default function RootLayout({ children }) {
  return <>{children}</>;
}
