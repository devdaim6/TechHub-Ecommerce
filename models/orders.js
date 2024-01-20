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
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
        },
        productColor: {
          type: String,
        },
        name: {
          type: String,
        },
        imageUrl: {
          type: String,
        },
        size: {
          type: String,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    isShippingFree: { type: Boolean, default: false },
    pickUpAtStore: { type: Boolean, default: false },
    paymentId: String,
    paymentOption: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "cancelled", "shipped", "delivered"],
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
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
