"use client";
import React from "react";
import Filters from "../ui/Filters";
import Pagination from "../ui/Pagination";
import { useSelector } from "react-redux";
import ScreenLoading from "../ui/ScreenLoading";
import ProductGrid from "./ProductGrid";
import Link from "next/link";
import CardSkeleton from "../ui/CardSkeleton";

const ProductsPage = () => {
  const filters = useSelector((state) => state.filter);
  const { length, products, loading, totalPages, currentPage } = useSelector(
    (state) => state.products
  );
  return (
    <>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
      </div>
      <Filters
        currentPage={currentPage}
        filters={filters}
        totalProducts={length}
      />
      {loading ? (
        <div className="flex justify-center flex-col mt-16 lg:flex-row">
          <CardSkeleton length={filters?.perPage} />
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        filters={filters}
      />
    </>
  );
};

export default ProductsPage;
