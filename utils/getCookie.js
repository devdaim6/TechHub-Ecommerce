"use server";
import { cookies } from "next/headers";
const cookieStore = cookies();

export const getCookie = async (key) => {
  return cookieStore.get(key);
};
