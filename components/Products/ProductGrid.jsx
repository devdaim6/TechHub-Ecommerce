import React from "react";
import Link from "next/link";
const ProductGrid = ({ products }) => {
  console.log(products);
  return (
    <>
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(products) && products?.length === 0 ? (
          <div className="min-h-screen w-screen grid place-items-center text-base-content">
            Sorry No Products Found with selected Filters.
          </div>
        ) : (
          products.map((product) => {
            return (
              <Link
                key={product._id}
                href={`/products/${product.productCode}`}
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
                  <div className="flex justify-between">
                    <span className="text-accent">
                      &#8377;{product?.price}&nbsp;{" "}
                      {product?.discount !== 0 && (
                        <span
                          className="text-error/60 "
                          style={{ textDecoration: "line-through" }}
                        >
                          {(
                            product?.price /
                            (1 - product?.discount / 100)
                          ).toFixed(2)}
                        </span>
                      )}
                    </span>
                    {product?.discount !== 0 && (
                      <div className="badge badge-secondary">
                        {product?.discount}%off
                      </div>
                    )}
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
