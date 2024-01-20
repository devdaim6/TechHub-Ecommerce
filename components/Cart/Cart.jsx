"use client";
import React from "react";
import { useSelector } from "react-redux";
import CartTotals from "./CartTotals";
import Link from "next/link";
import CartItemsList from "./CartItemsList";
import CheckoutLinks from "./CheckoutLinks";
import ShippingOptions from "./ShippingOptions";

const Cart = () => {
  const cart = useSelector((state) => state?.cartState);
  return (
    <>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/cart" className="truncate ">
              Cart
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cart={cart} />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          <ShippingOptions
            cartItemsLength={cart?.cartItems?.length}
            pickupAtStore={cart?.pickupAtStore}
          />
          <CheckoutLinks cartItemsLength={cart?.cartItems?.length} />
        </div>
      </div>
      {cart?.cartItems?.length < 1 && (
        <div className="flex flex-col items-center  justify-center min-h-screen gap-0">
          <p className=" info-content">No Items in Cart</p>
          <Link href="/products" className="btn    btn-accent">
            Return to Products
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
