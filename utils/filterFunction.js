"use client";
import axios from "axios";
export const getFilteredProducts = async (filters, currentPage) => {
  const modal = document.getElementById("my_modal_7");
  if (modal && modal.checked) {
    modal.checked = false;
  }
  const url = `/api/products?page=${currentPage}&perPage=${
    filters?.perPage
  }&category=${filters?.category}&searchProduct=${
    filters?.searchProduct
  }&minPrice=${filters?.priceRange[0]}&maxPrice=${
    filters?.priceRange[1]
  }&inStock=${filters?.inStock ? filters?.inStock : false}&shipping=${
    filters?.freeShipping ? filters?.freeShipping : false
  }&sortBy=${
    filters?.sortBy == "priceLowToHigh"
      ? "price"
      : filters?.sortBy == "priceHighToLow"
      ? "price"
      : filters?.sortBy
  }&sortOrder=${
    filters?.sortBy == "priceLowToHigh"
      ? "asc"
      : filters?.sortBy == "priceHighToLow"
      ? "desc"
      : filters?.sortBy
  }`;

  const response = await axios.get(url);
  return response;
};
