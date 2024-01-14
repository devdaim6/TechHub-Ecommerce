"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useEmailVerification = (email) => {
  return useQuery({
    queryKey: [`user-${email}`],
    queryFn: async () => {
      const response = await axios.post("/api/email-verification", {
        email,
      });
      return response.data;
    },
  });
};
