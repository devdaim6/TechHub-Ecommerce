import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      match: /^[a-zA-Z]/,
      required: [true, "Name is Required"],
    },

    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: [true, "Username is already taken!"],
    },
    password: {
      type: String,
      required: true,
      match:
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+{};:'",<.>\/?\\[\]^_`{|}~])[a-zA-Z!@#$%^&*()-_=+{};:'",<.>\/?\\[\]^_`{|}~0-9]{6,}$/,
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Email is not valid"],
    },
    phone: {
      type: String,
      unique: [true, "Mobile Number already exists"],
      required: [true, "Mobile Number is required"],
      validate: {
        validator: function (value) {
          return /^[6-9]\d{9}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid Indian phone number!`,
      },
    },

    image: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    savedAddresses: [
      {
        landmark: String,
        city: String,
        state: String,
        zipCode: {
          type: Number,
          validate: {
            validator: function (value) {
              return /^\d{6}$/.test(value.toString());
            },
            message: (props) =>
              `${props.value} is not a valid 6-digit zip code!`,
          },
          required: [true, "Zip code is required"],
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        date: { type: Date, default: Date.now },
      },
    ],
    notificationPreferences: {
      email: {
        type: Boolean,
        default: true,
      },
    },
    reviews: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: { type: String, default: "Anonymous" },
        comment: { type: String, default: "" },
        title: { type: String, default: "" },
        image: { type: String, default: "" },
        rating: { type: Number, required: true },
        isReview: { type: Boolean, default: false },
        reviewCode: { type: String, required: true, unique: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
