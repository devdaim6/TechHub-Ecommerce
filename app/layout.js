import Nav from "@/components/Navbar/Nav";
import "./globals.css";
import TopContent from "@/components/Header/TopContent";
import Footer from "@/components/Footer/Footer";
import { AuthProvider, QueryProvider, StoreProvider } from "@/app/Provider";
import { Toaster } from "sonner";
export const metadata = {
  title: "Tech Hub | you Dream we Desgin",
  description: "An Ecommerce Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <StoreProvider>
              <TopContent />
              <Toaster closeButton position="top-center" />
              <Nav />
              {children}
              <Footer />
            </StoreProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
