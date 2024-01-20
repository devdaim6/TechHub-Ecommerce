import { setPickup } from "@/features/cart/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ShippingOptions = ({ cartItemsLength, pickupAtStore }) => {
  const dispatch = useDispatch();

  return (
    <>
      {cartItemsLength > 0 && (
        <div className="flex">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-accent"
                checked={!pickupAtStore}
                onChange={() => {
                  dispatch(setPickup({ pickupAtStore: false }));
                }}
              />
              <span className="label-text"> Deliverable</span>
            </label>
          </div>{" "}
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-accent"
                checked={pickupAtStore}
                onChange={() => {
                  dispatch(setPickup({ pickupAtStore: true }));
                }}
              />
              <span className="label-text"> Pickup at Store</span>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingOptions;
