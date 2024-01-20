"use client";
import { useEffect, useState } from "react";
import { clearCart } from "@/features/cart/cartSlice";
import { paymentToken } from "@/hooks/usePaymentTokens";
import { getUserFromLocalStorage } from "@/utils/util";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import CartTotals from "../Cart/CartTotals";
import SelectAddress from "./SelectAddress";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state) => state.cartState);
  const [token, setToken] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    landmark: "",
    city: "",
    state: "",
    name: "",
    phone: null,
    paymentId: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getToken = async () => {
      const response = await paymentToken(
        `/api/user/${getUserFromLocalStorage()?.id}/payment-token`
      );
      if (response?.data?.success) {
        setToken(response?.data?.token);
      }
    };
    getToken();
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    const response = await paymentToken(
      `/api/user/${
        getUserFromLocalStorage()?.id
      }/payment-token?field=verify-token&token=${token}`
    );

    if (response.data.success) {
      //logic for order
      const data = {
        userId: getUserFromLocalStorage()?.id,
        orderItems: cart?.cartItems,
        totalAmount: parseFloat(cart?.orderTotal),
        isShippingFree: cart?.shipping === 0 ? true : false,
        pickUpAtStore: cart?.pickupAtStore,
        paymentId: shippingInfo?.paymentId,
        paymentOption: cart?.pickupAtStore ? "cod" : "online",
        paymentStatus: cart?.pickupAtStore ? "pending" : "paid",
        shippingAddress: {
          landmark: shippingInfo?.landmark,
          city: shippingInfo?.city,
          state: shippingInfo?.state,
          name: shippingInfo?.name,
          phone: parseInt(shippingInfo?.phone),
          zipCode: shippingInfo?.zipCode ? parseInt(shippingInfo?.zipCode) : "",
        },
      };

      const response = await axios.post("/api/orders", data);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(clearCart());
        router.push("/orders/successfull");
      } else {
        toast.success(response?.data?.message);
      }
    } else if (
      response.data.message === "Token not provided." &&
      response.data.status === 401
    ) {
      toast.error(response.data.message);
      setTimeout(() => {
        router.back();
      }, 1500);
    } else toast.error(response.data.message);
  };

  return (
    <>
      <div className="p-4 mt-8 grid gap-8 md:grid-cols-2 items-start">
        <form
          className="flex flex-col gap-y-4"
          onSubmit={(e) => handleOrder(e, shippingInfo)}
        >
          <h4 className="font-medium text-xl capitalize">
            Shipping Information
          </h4>

          <input
            name="name"
            type="text"
            placeholder="Name *"
            value={shippingInfo.name}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone *"
            value={shippingInfo.phone}
            required
            onChange={handleChange}
            className="input input-bordered"
          />
          <input
            name="paymentId"
            type="text"
            placeholder={"Transaction Id *"}
            value={shippingInfo.paymentId}
            onChange={handleChange}
            required
            className={`input input-bordered ${
              cart?.pickupAtStore ? "hidden" : ""
            }`}
          />
          <input
            name="landmark"
            type="text"
            placeholder="Landmark"
            value={shippingInfo.landmark}
            onChange={handleChange}
            className="input input-bordered"
          />
          <input
            name="city"
            type="text"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleChange}
            className="input input-bordered"
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={shippingInfo.state}
            onChange={handleChange}
            className="input input-bordered"
          />
          <input
            name="zipCode"
            type="text"
            placeholder="Zip Code"
            value={shippingInfo.zipCode}
            onChange={handleChange}
            className="input input-bordered"
          />
          <div className="mt-4">
            <button type="submit" className="btn btn-accent btn-block">
              Place your Order
            </button>
          </div>
        </form>
        <div className="flex flex-col">
          {!cart?.pickupAtStore && <SelectAddress />}
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
