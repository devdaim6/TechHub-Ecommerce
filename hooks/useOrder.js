"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useOrder = (userId, date) => {
  return useQuery({
    queryKey: [`user-${userId}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/user/${userId}?field=orders&startDate=${date[0]?.startDate}&endDate=${date[0]?.endDate}`
      );
      return data;
    },
  });
};
