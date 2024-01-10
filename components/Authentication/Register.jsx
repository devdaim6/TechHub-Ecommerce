import React from "react";

const Register = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Embark on a journey of endless possibilities. Register now to
              access a world of innovation and personalized experiences. Our
              platform is designed to provide you with the tools you need to
              thrive. Seize the opportunity to connect, learn, and create in a
              community that values your uniqueness. Join us and be part of a
              network where your ideas and aspirations come to life. Your future
              begins here!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
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
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control col-span-2 max-w-xl">
                  <label className="label">
                    <span className="label-text">Profile Picture</span>
                    <span className="label-text-alt text-xs">
                      JPG & PNG only
                    </span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xl"
                  />
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
