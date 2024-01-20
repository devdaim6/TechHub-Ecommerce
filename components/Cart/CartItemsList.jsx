import React from "react";
import CartItem from "./CartItem";

const CartItemsList = ({ cart }) => {
  return (
    <>
      {cart?.cartItems.map((item) => {
        return <CartItem cartItem={item} />;
      })}
    </>
  );
};

export default CartItemsList;
