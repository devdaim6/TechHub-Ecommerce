"use client";

import axios from "axios";

export const useProducts = (
  page,
  perPage,
  searchProduct,
  minPrice,
  maxPrice,
  inStock,
  shipping,
  sortBy,
  sortOrder
) => {
  return useQuery({
    queryKey: [`all-products`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products?
      page=${page}&
      perPage=${perPage}&
      searchProduct=${searchProduct}&
      minPrice=${minPrice}&
      maxPrice=${maxPrice}&
      inStock=${inStock}&
      shipping=${shipping}&
      sortBy=${sortBy}&
      sortOrder=${sortOrder}`);
      return data;
    },
  });
};
