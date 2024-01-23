"use client";
import ScreenLoading from "@/components/ui/ScreenLoading";
import WishlistCard from "@/components/ui/WishlistCard";
import { useUser } from "@/hooks/useUser";
import { getUserFromLocalStorage } from "@/utils/util";
import Link from "next/link";

const Wishlist = () => {
  const { isLoading, data, refetch } = useUser(
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
              <div className="flex flex-col items-center  justify-center min-h-[80vh] lg:min-h-screen gap-1">
                <p className=" info-content">Your wishlist is empty.</p>
                <Link href="/products" className="btn btn-accent">
                  Return to Products
                </Link>
              </div>
            ) : (
              <ul className="grid grid-cols-1 w-full lg:grid-cols-3 gap-1">
                {data?.map((product) => (
                  <>
                    <WishlistCard
                      refetch={refetch}
                      key={product?._id}
                      product={product}
                    />
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
