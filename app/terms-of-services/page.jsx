import React from "react";
import Link from "next/link";

const TermsOfService = () => {
  return (
    <div className="container mx-auto my-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        By using the TechHub website (&rdquo;Service&rdquo;), you agree to
        comply with and be bound by the following terms and conditions of use.
        Please review the terms carefully. If you do not agree to these terms,
        you should not use this Service.
      </p>

      <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
      <p className="mb-4">
        Your access to and use of the Service is conditioned on your acceptance
        of and compliance with these Terms. These Terms apply to all visitors,
        users, and others who access or use the Service.
      </p>

      <h2 className="text-2xl font-bold mb-3">2. Use of the Service</h2>
      <p className="mb-4">
        The content of the pages of this Service is for your general information
        and use only. It is subject to change without notice. Your use of any
        information or materials on this Service is entirely at your own risk,
        for which we shall not be liable.
      </p>

      <h2 className="text-2xl font-bold mb-3">3. Privacy Policy</h2>
      <p className="mb-4">
        Your use of the Service is also governed by our Privacy Policy. Please
        review our Privacy Policy to understand our practices.
      </p>

      <h2 className="text-2xl font-bold mb-3">4. Intellectual Property</h2>
      <p className="mb-4">
        The Service and its original content, features, and functionality are
        owned by TechHub and are protected by international copyright,
        trademark, patent, trade secret, and other intellectual property or
        proprietary rights laws.
      </p>

      {/* Add more sections as needed based on your specific services and policies */}

      <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
      <p>
        If you have any questions about these Terms, please{" "}
        <Link className="text-primary hover:text-primary/70" href="/contact">
          contact us
        </Link>
        .
      </p>
    </div>
  );
};

export default TermsOfService;
