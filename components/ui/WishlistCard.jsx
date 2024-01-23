import Link from "next/link";

const WishlistCard = ({ product }) => {
  return (
    <>
      <Link
        href={`/products/${decodeURIComponent(product.productDetails?.name)}/${
          product.productDetails?.productCode
        }/${product?.productId}/`}
        className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
      >
        <figure className="px-4 pt-4">
          <img
            src={product?.productDetails?.imageUrl}
            alt={product?.productDetails?.name}
            className="rounded-xl h-64 md:h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title capitalize tracking-wider">
            {product?.productDetails?.name}
          </h2>
          <div className="flex">
            <div>
              <p className="text-accent text-xl">
                &#8377;
                {product?.productDetails?.price}&nbsp;{" "}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default WishlistCard;
