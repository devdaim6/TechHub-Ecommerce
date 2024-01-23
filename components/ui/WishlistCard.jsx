import { getUserFromLocalStorage } from "@/utils/util";
import { BookmarkMinusIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const WishlistCard = ({ product, refetch }) => {
  const removeFromWishlist = async (productId, userId) => {
    const res = await fetch(`/api/products/wishlist`, {
      body: JSON.stringify({ productId, userId }),
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    if (response?.success) {
      toast.info("Item Removed from Wishlist");
      refetch();
    } else {
      toast.error("Item Removed from Wishlist");
    }
  };
  return (
    <>
      <div className="card w-full shadow-xl hover:shadow-2xl transition duration-300">
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
          <div className="flex justify-between">
            <div className="tooltip" data-tip="Remove From Wislist">
              <button
                className="btn btn-error"
                onClick={() => {
                  removeFromWishlist(
                    product?.productId,
                    getUserFromLocalStorage()?.id
                  );
                }}
              >
                {" "}
                <BookmarkMinusIcon />
              </button>
            </div>
            <Link
              href={`/products/${product.productDetails.name}/${product.productDetails.productCode}/${product?.productId}/`}
            >
              {" "}
              <div className="tooltip" data-tip="Buy Now">
                <button type="button" className="btn btn-accent">
                  {" "}
                  Buy Now
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistCard;
