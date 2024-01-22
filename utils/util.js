"use client";
import { getCookie } from "@/utils/getCookie";

export const formatPrice = (price) => {
  const InrAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format((price / 100).toFixed(2));
  return InrAmount;
};

export const openSuccessMessage = () => {
  if (typeof window !== "undefined") {
    document.getElementById("my_modal_1").showModal();
  }
};

export const openFilterDate = () => {
  if (typeof window !== "undefined") {
    document.getElementById("my_modal_6").showModal();
  }
};
export const openFilterLabel = () => {
  if (typeof window !== "undefined") {
    document.getElementById("my_modal_5").showModal();
  }
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const setUserToLocalStorage = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const setCartToLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

export const removeCartFromLocalStorage = (defaultState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(defaultState));
  }
};

export const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  }
  return null;
};

export const getToken = async () => {
  const token = await getCookie("next-auth.session-token");
  return token;
};

export const getCartFromLocalStorage = (defaultState) => {
  if (typeof window !== "undefined") {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      return JSON.parse(cartData);
    }
    localStorage.setItem("cart", JSON.stringify(defaultState));
    return defaultState;
  }
  return defaultState;
};

export const editQuantity = async (productId, quantity) => {
  const userId = getUserFromLocalStorage()?.id;
  if (!userId) return;
  const res = await fetch(`/api/user/${userId}/cart`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return res;
};

export const pushToCart = async (productId, quantity) => {
  const userId = getUserFromLocalStorage()?.id;

  if (!userId) return;
  const res = await fetch(`/api/user/${userId}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return res;
};

export const removeFromCart = async (productId) => {
  const userId = getUserFromLocalStorage()?.id;

  if (!userId) return;
  const res = await fetch(`/api/user/${userId}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  return res;
};
