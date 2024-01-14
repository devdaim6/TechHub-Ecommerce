const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderCode: { type: String, required: true, unique: true },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    isShippingFree: { type: Boolean, default: false },
    paymentId: String,
    paymentOption: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "unpaid"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    shippingAddress: {
      landmark: String,
      city: String,
      state: String,
      name: String,
      phone: {
        type: String,
        required: [true, "Mobile Number is required"],
        validate: {
          validator: function (value) {
            return /^[6-9]\d{9}$/.test(value);
          },
          message: (props) =>
            `${props.value} is not a valid Indian phone number!`,
        },
      },
      zipCode: {
        type: Number,
        validate: {
          validator: function (value) {
            return /^\d{6}$/.test(value.toString());
          },
          message: (props) => `${props.value} is not a valid 6-digit zip code!`,
        },
        required: [true, "Zip code is required"],
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
