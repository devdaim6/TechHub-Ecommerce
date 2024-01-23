"use client";
import ProductCard from "@/components/Products/ProductCard";
import ButtonLoading from "@/components/ui/ButtonLoading";
import ScreenLoading from "@/components/ui/ScreenLoading";
import WishlistCard from "@/components/ui/WishlistCard";
import { useUser } from "@/hooks/useUser";
import { getUserFromLocalStorage } from "@/utils/util";

const Wishlist = () => {
  const removeFromWishlist = (itemId) => {};

  const { isLoading, data } = useUser(
    getUserFromLocalStorage()?.id,
    "wishlist"
  );
  return (
    <>
      <div className="max-w-screen min-h-screen  mx-auto ">
        <div className="header mt-5 py-1">
          <h2 className="text-3xl font-semibold ">
            <div className="divider"> Wishlist</div>
          </h2>
        </div>
        {!data || isLoading ? (
          <ScreenLoading
            upperText={"Your Wishlist is being Loaded."}
            lowerText={`Please wait a moment ...`}
          />
        ) : (
          <>
            {data?.length === 0 ? (
              <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
              <ul className="grid grid-cols-1 w-full lg:grid-cols-3 gap-1">
                {data?.map((product) => (
                  <>
                    <WishlistCard key={product?._id} product={product} />
                  </>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
