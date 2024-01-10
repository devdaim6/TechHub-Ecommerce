import Nav from "@/components/Navbar/Nav";
import "./globals.css";
export const metadata = {
  title: "Tech Hub | you Dream we Desgin",
  description: "An Ecommerce Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
