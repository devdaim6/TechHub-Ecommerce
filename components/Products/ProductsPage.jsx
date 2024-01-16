"use client";
import React from "react";
import Filters from "../ui/Filters";
import Pagination from "../ui/Pagination";
import { useSelector } from "react-redux";
import ScreenLoading from "../ui/ScreenLoading";

const ProductsPage = () => {
  const filters = useSelector((state) => state.filter);
  const { products, loading, totalPages, currentPage } = useSelector(
    (state) => state.products
  );
  return (
    <>
      <Filters currentPage={currentPage} filters={filters} />
      {loading && <ScreenLoading />}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        filters={filters}
      />
    </>
  );
};

export default ProductsPage;
