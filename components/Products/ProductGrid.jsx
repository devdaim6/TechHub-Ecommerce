"use client"
import React from "react";
import Link from "next/link";
const ProductGrid = ({ products }) => {
  return (
    <>
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? (
          <>
            <div className="grid place-items-center w-screen h-screen lg:h-[30vh]">
              Sorry No Products Found
            </div>
          </>
        ) : (
          products.map((product) => {
            return (
              <Link
                key={product._id}
                href={`/products/${product.name}/${product.productCode}/${product?._id}/`}
                className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={product?.imageUrl}
                    alt={product?.name}
                    className="rounded-xl h-64 md:h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title capitalize tracking-wider">
                    {product?.name}
                  </h2>
                  <div className="flex">
                    <div>
                      <p className="text-accent text-xl">
                        <span className="text-error ">
                          {product?.discount !== 0 && (
                            <span>
                              {"-"}
                              {product?.discount}
                              {"% "}
                            </span>
                          )}
                        </span>
                        &#8377;
                        {product?.price}&nbsp;{" "}
                      </p>
                      {product?.discount !== 0 && (
                        <p className="text-neutral-content/70 ">
                          M.R.P. &#8377;
                          <span style={{ textDecoration: "line-through" }}>
                            {(
                              product?.price /
                              (1 - product?.discount / 100)
                            ).toFixed(2)}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default ProductGrid;
