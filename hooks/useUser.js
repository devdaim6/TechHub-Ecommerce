"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useUser = (userId, field) => {
  if (userId)
    return useQuery({
      queryKey: [`user-${field}-${userId}`],
      queryFn: async () => {
        const { data } = await axios.get(
          `/api/user/${userId}/?field=${field ?? ""}`
        );
        return data;
      },
    });
};
