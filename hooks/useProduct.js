"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = (field, productId) => {
  return useQuery({
    queryKey: [`products`, field, productId],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/products/${productId}?field=${field}`
      );
      return data;
    },
  });
};
