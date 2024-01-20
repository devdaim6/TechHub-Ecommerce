import React from "react";
import CartItem from "./CartItem";

const CartItemsList = ({ cart }) => {
  return (
    <>
      {cart?.cartItems.map((item) => {
        return <CartItem key={item.productId} cartItem={item} />;
      })}
    </>
  );
};

export default CartItemsList;
