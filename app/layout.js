import Nav from "@/components/Navbar/Nav";
import "./globals.css";
import TopContent from "@/components/Header/TopContent";
import Footer from "@/components/Footer/Footer";
export const metadata = {
  title: "Tech Hub | you Dream we Desgin",
  description: "An Ecommerce Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopContent />
        <Nav />

        {children}
        <Footer/>
      </body>
    </html>
  );
}
