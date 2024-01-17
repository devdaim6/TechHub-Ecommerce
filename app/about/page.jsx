import React from "react";
const page = () => {
  return (
    <>
      <div className="container mx-auto py-12">
        <div className="divider divider-neutral">
          {" "}
          <h1 className="text-4xl font-bold  text-base-content text-center">
            About Us
          </h1>
        </div>
        <div className="p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-base-content">
            Welcome to Techhub - Where Innovation Meets Precision.
          </h2>
          <p className="text-base-content mb-6">
            Techhub is not just a company; it&apos;s a testament to the marriage
            of creativity and excellence. With an unwavering dedication to
            customization and a relentless pursuit of quality, we transcend
            conventional boundaries. At Techhub, we pride ourselves on
            transforming abstract ideas into tangible realities across various
            mediums. From bespoke stationery to impeccable shirt prints,
            narrative-rich mugs, and the timeless elegance of laser-etched
            woodworks, our craftsmanship speaks volumes about our commitment to
            elevating your personal and professional expressions.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-base-content">
            Services
          </h2>

          {/* Empowering Your Imagination */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-base-content">
              Empowering Your Imagination
            </h3>
            <p className="text-base-content">
              Techhub is on a mission to empower your imagination. Through
              meticulously tailored solutions, we turn conceptual brilliance
              into tangible, personalized products that resonate with your
              unique identity.
            </p>
          </div>

          {/* What We Do */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-base-content">
              What We Do
            </h3>

            {/* Customized Stationery */}
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2 text-base-content">
                Customized Stationery
              </h4>
              <p className="text-base-content">
                Your stationery should be an extension of your professional
                identity. Explore our collection of custom-designed business
                cards, letterheads, and invitations, meticulously crafted to
                leave a lasting impression.
              </p>
            </div>

            {/* Apparel Printing */}
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2 text-base-content">
                Apparel Printing
              </h4>
              <p className="text-base-content">
                Wear your professionalism with pride. Our expert printing
                services ensure flawless design transfer onto a range of
                garments, allowing you to seamlessly integrate your personal
                brand into your wardrobe.
              </p>
            </div>

            {/* Personalized Mugs */}
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2 text-base-content">
                Personalized Mugs
              </h4>
              <p className="text-base-content">
                Elevate your coffee break. Our personalized mugs capture your
                cherished memories, favorite quotes, or images, transforming
                every sip into a moment of inspiration.
              </p>
            </div>

            {/* Laser-Etched Woodworks */}
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2 text-base-content">
                Laser-Etched Woodworks
              </h4>
              <p className="text-base-content">
                Experience the epitome of craftsmanship with our laser-etched
                woodworks. Our artisans meticulously craft exquisite wooden
                products, each piece personalized with precision to transform
                ordinary items into cherished keepsakes.
              </p>
            </div>

            {/* Online Support */}
            <div>
              <h4 className="text-lg font-bold mb-2 text-base-content">
                Online Support
              </h4>
              <p className="text-base-content">
                Techhub is not just about products; we&apos;re your partners in
                progress. Our dedicated team offers expert assistance in
                navigating the intricacies of online processes, streamlining
                tasks like scholarship applications, PAN card submissions, and
                other essential documentation. We simplify the process, enabling
                you to focus on your goals.
              </p>
            </div>
          </div>
          <h2 className="text-md font-bold mb-2 text-base-content">
            At Techhub, professionalism meets innovation. Explore our offerings,
            and let us redefine the boundaries of your personal and professional
            expressions. Welcome to a world where precision and creativity
            converge seamlessly.
          </h2>
        </div>
      </div>
    </>
  );
};

export default page;
