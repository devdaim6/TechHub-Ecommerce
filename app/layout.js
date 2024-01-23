import Nav from "@/components/Navbar/Nav";
import "./globals.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { WebVitals } from "@/components/WebVitals";
import TopContent from "@/components/Header/TopContent";
import Footer from "@/components/Footer/Footer";
import {
  AuthProvider,
  QueryProvider,
  StoreProvider,
  NextProvider,
} from "@/app/Provider";
import { Toaster } from "sonner";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
};

export const metadata = {
  title: {
    template: "%s | Tech Hub | You Dream We Design",
    default: "Tech Hub | You Dream We Design",
  },
  category: "technology",
  description:
    "Tech Hub is more than a company; it's a testament to the fusion of creativity and excellence. With an unwavering commitment to customization and a relentless pursuit of quality, we surpass conventional boundaries. Discover a diverse range of personalized products, from bespoke stationery and impeccable shirt prints to narrative-rich mugs and timeless laser-etched woodworks. Our craftsmanship speaks volumes about our dedication to elevating your personal and professional expressions. Tech Hub empowers your imagination with meticulously tailored solutions, turning conceptual brilliance into tangible, personalized products that resonate with your unique identity. Explore our collection of custom-designed business cards, letterheads, and invitations, meticulously crafted to leave a lasting impression. Wear your professionalism with pride through our expert apparel printing services, seamlessly integrating your personal brand into your wardrobe. Elevate your coffee break with personalized mugs that capture cherished memories, favorite quotes, or images, transforming every sip into a moment of inspiration. Experience the epitome of craftsmanship with our laser-etched woodworks, where each piece is meticulously crafted to transform ordinary items into cherished keepsakes. At Tech Hub, we're more than just products; we're your partners in progress. Our dedicated team offers expert assistance in navigating online processes, streamlining tasks like scholarship applications, PAN card submissions, and other essential documentation. We simplify the process, enabling you to focus on your goals. At Tech Hub, professionalism meets innovation. Explore our offerings and let us redefine the boundaries of your personal and professional expressions. Welcome to a world where precision and creativity converge seamlessly.",
  keywords:
    "Tech Hub, creativity, excellence, customization, quality, bespoke stationery, shirt prints, personalized mugs, laser-etched woodworks, craftsmanship, imagination, conceptual brilliance, unique identity, business cards, letterheads, invitations, apparel printing, personalized products, professionalism, innovation, online processes, scholarship applications, PAN card submissions, documentation, precision, creativity.",
  canonical: "https://tech-hub-ak.vercel.app/",
  og: {
    title: "Tech Hub | You Dream We Design",
    type: "website",
    url: "https://tech-hub-ak.vercel.app/",
    description:
      "Explore a world of innovation at Tech Hub. We design dreams into reality. Discover a wide range of tech products and personalized services. Your one-stop Ecommerce Store.",
    site_name: "Tech Hub", // Your site name
  },
  // icons: {
  //   icon: "/icon.png",
  //   shortcut: "/shortcut-icon.png",
  //   apple: "/apple-icon.png",
  // },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noindex: false,
      nofollow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <QueryProvider>
            <AuthProvider>
              <StoreProvider>
                <TopContent />
                <Toaster closeButton position="top-center" />
                <Nav />
                <div className="mt-[4.5rem]">{children}</div>
                <Footer />
                <SpeedInsights />
                <Analytics />
                <WebVitals />
              </StoreProvider>
            </AuthProvider>
          </QueryProvider>
        </NextProvider>
      </body>
    </html>
  );
}
