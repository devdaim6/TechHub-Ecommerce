"use client";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { getBase64 } from "@/utils/util";
const ContactUSPage = () => {
  const handleContactForm = async (e) => {
    try {
      e.preventDefault();
      const form = new FormData(e.currentTarget);

      const [name, email, message, image] = [
        "name",
        "email",
        "message",
        "image",
      ].map((field) => form.get(field));
      const image64 = await getBase64(image);
      const response = await axios.post("/api/contact-us", {
        name,
        email,
        message,
        image: image64,
      });
      if (response.data.success) {
        e.target.reset();
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col  ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Contact Us!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleContactForm}>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* Second Row */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control col-span-2 max-w-xl">
                  <label className="label">
                    <span className="label-text">Image</span>
                    <span className="label-text-alt text-xs">
                      JPG & PNG only
                    </span>
                  </label>
                  <input
                    name="image"
                    accept=".jpg, .png|image/*"
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xl"
                  />
                </div>
              </div>{" "}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Message</span>
                  <span className="label-text-alt text-xs">
                    250 characters max.
                  </span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Your Message"
                  name="message"
                ></textarea>
                <div className="label"></div>
              </label>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent">
                  Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUSPage;
