import Link from "next/link";
const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-base-200 border-t border-neutral text-base-content">
        <aside>
          <img src="your-logo.png" alt="TechHub Logo" className="mb-4" />
          <p>
            TechHub
            <br />
            Innovating Tech Solutions Since 1992
          </p>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <Link href="/customized-printing" className="link link-hover">
            Customized Printing
          </Link>
          <Link href="/laser-engraving" className="link link-hover">
            Laser Engraving
          </Link>
          <Link href="/t-shirt-prints" className="link link-hover">
            T-Shirt Printing
          </Link>
          <Link href="/vector-portraits" className="link link-hover">
            Vector Frames
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Discover</header>
          <Link href="/products" className="link link-hover">
            Products
          </Link>
          <Link href="/about" className="link link-hover">
            About Us
          </Link>
          <Link href="/contact" className="link link-hover">
            Contact
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <Link href="/terms-of-services" className="link link-hover">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="link link-hover">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="link link-hover">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
