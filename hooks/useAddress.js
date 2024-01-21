"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useAddress = (addressId, userId) => {
  return useQuery({
    queryKey: [`user`, addressId, userId],
    queryFn: async () => {
      const response = await axios.get(
        `/api/user/${userId}/addresses?address=${addressId}`
      );
      return response.data;
    },
  });
};
