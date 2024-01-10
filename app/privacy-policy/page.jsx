import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto my-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        This Privacy Policy outlines how TechHub (&rdquo;we,&rdquo; &rdquo;our,&rdquo;
        or &rdquo;us&rdquo;) collects, uses, maintains, and discloses
        information collected from users of the TechHub website
        (&rdquo;Service&rdquo;).
      </p>

      <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information from users in various ways,
        including when users visit our site, register on the site, place an
        order, subscribe to the newsletter, respond to a survey, and fill out a
        form.
      </p>

      <h2 className="text-2xl font-bold mb-3">
        2. How We Use Collected Information
      </h2>
      <p className="mb-4">
        The information we collect may be used to personalize user experience,
        process transactions, send periodic emails, and improve our services.
      </p>

      <h2 className="text-2xl font-bold mb-3">
        3. How We Protect Your Information
      </h2>
      <p className="mb-4">
        We adopt appropriate data collection, storage, and processing practices
        and security measures to protect against unauthorized access,
        alteration, disclosure, or destruction of your personal information.
      </p>

      <h2 className="text-2xl font-bold mb-3">
        4. Sharing Your Personal Information
      </h2>
      <p className="mb-4">
        We do not sell, trade, or rent users&apos; personal identification
        information to others. We may share generic aggregated demographic
        information not linked to any personal identification information
        regarding visitors and users with our business partners, trusted
        affiliates, and advertisers.
      </p>

      {/* Add more sections as needed based on your specific services and policies */}

      <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
