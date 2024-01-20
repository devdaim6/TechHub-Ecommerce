"use client";
import { editItem, removeItem } from "@/features/cart/cartSlice";
import { generateAmountOptions } from "@/utils/util";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ productId }));
  };
  const handleQuantity = (e) => {
    dispatch(editItem({ productId, quantity: parseInt(e.target.value) }));
  };
  const { productId, name, price, imageUrl, quantity, productColor } = cartItem;

  return (
    <>
      <article
        key={productId}
        className="mb-8 gap-x-2  flex lg:items-center border-b border-base-300 pb-4 last:border-b-0"
      >
        <img
          src={imageUrl}
          alt={name}
          className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover mb-4 sm:mb-0 sm:mr-4"
        />

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row lg:justify-between justify-start items-start">
            <div>
              <h3 className="capitalize font-medium text-lg">{name}</h3>
              <p className="font-medium">&#8377;{price}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-x-4">
            <p className="text-sm capitalize">
              Color:
              <span
                className="badge badge-sm  border border-neutral ml-2"
                style={{ backgroundColor: productColor }}
              ></span>
            </p>

            <div className="form-control max-w-xs">
              <select
                name="amount"
                id="amount"
                className="mt-1 select select-base select-bordered select-xs"
                value={quantity}
                onChange={handleQuantity}
              >
                {generateAmountOptions(quantity + 5)}
              </select>
            </div>
          </div>
        </div>
        <button
          className="mt-2 lg:block inline link link-error link-hover text-sm lg:w-10 w-auto"
          onClick={removeItemFromTheCart}
        >
          <p className="flex items-center">
            <span className="lg:flex hidden">Remove</span>
            <span>
              <Trash2Icon />
            </span>
          </p>
        </button>
      </article>
    </>
  );
};

export default CartItem;
