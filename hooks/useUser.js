"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (userId, field) => {
  return useQuery({
    queryKey: [`user-${field ? `${field}` : "profile"}-${userId}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/user/${userId}/?${field && `field=${field}`}`
      );
      return data;
    },
  });
};
