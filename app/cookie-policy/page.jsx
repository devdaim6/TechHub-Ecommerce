import React from "react";
import Link from "next/link";
const CookiePolicy = () => {
  return (
    <div className="container mx-auto my-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <p className="mb-4">
        This Cookie Policy explains how TechHub (&rdquo;we,&rdquo;
        &rdquo;our,&rdquo; or &rdquo;us&rdquo;) uses cookies on our website
        (&rdquo;Service&rdquo;).
      </p>

      <h2 className="text-2xl font-bold mb-3">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small pieces of text sent by your web browser by a website
        you visit. A cookie file is stored in your web browser and allows the
        Service or a third-party to recognize you and make your next visit
        easier and the Service more useful to you.
      </p>

      <h2 className="text-2xl font-bold mb-3">2. How We Use Cookies</h2>
      <p className="mb-4">
        We use cookies for various purposes, including to understand and save
        user preferences, track and analyze usage, and improve our services.
      </p>

      <h2 className="text-2xl font-bold mb-3">3. Disabling Cookies</h2>
      <p className="mb-4">
        You can choose to disable cookies through your browser settings. Please
        note that disabling cookies may affect the functionality of the Service.
      </p>

      <h2 className="text-2xl font-bold mb-3">4. Third-Party Cookies</h2>
      <p className="mb-4">
        We may use third-party services that may use cookies. We have no control
        over these cookies and suggest you check the respective privacy policies
        for these services.
      </p>

      {/* Add more sections as needed based on your specific services and policies */}

      <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
      <p>
        If you have any questions about this Cookie Policy, please{" "}
        <Link className="text-primary hover:text-primary/70" href="/contact">
          contact us
        </Link>
        .
      </p>
    </div>
  );
};

export default CookiePolicy;
