"use client";
import React from "react";
import Filters from "../ui/Filters";
import Pagination from "../ui/Pagination";
import { useSelector } from "react-redux";
import ScreenLoading from "../ui/ScreenLoading";
import ProductGrid from "./ProductGrid";

const ProductsPage = () => {
  const filters = useSelector((state) => state.filter);
  const { length, products, loading, totalPages, currentPage } = useSelector(
    (state) => state.products
  );
  return (
    <>
      <Filters
        currentPage={currentPage}
        filters={filters}
        totalProducts={length}
      />
      {loading ? <ScreenLoading /> : <ProductGrid products={products} />}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        filters={filters}
      />
    </>
  );
};

export default ProductsPage;
