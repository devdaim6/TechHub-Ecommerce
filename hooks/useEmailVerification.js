"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
export const useEmailVerification = (email) => {
  return useQuery({
    queryKey: [`user-${email}`],
    queryFn: async () => {
      const response = await axios.post("/api/email-verification", {
        email,
      });
      toast.success(response?.data?.message);
      return response.data;
    },
  });
};
