"use client";
import React from "react";
import ProductCard from "./ProductCard";
const ProductGrid = ({ products }) => {
  return (
    <>
      <div className="pt-1 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {!products && products?.length === 0 ? (
          <>
            <div className="grid place-items-center w-screen h-screen lg:h-[30vh]">
              Sorry No Products Found
            </div>
          </>
        ) : (
          products.map((product) => {
            return <ProductCard key={product?._id} product={product} />;
          })
        )}
      </div>
    </>
  );
};

export default ProductGrid;
