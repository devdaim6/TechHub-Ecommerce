"use client";

import axios from "axios";
import { getCookie } from "@/utils/getCookie";
export const formatPrice = (price) => {
  const InrAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format((price / 100).toFixed(2));
  return InrAmount;
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
  localStorage.setItem("user", JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};

export const getToken = async () => {
  const token = await getCookie("next-auth.session-token");
  return token;
};
