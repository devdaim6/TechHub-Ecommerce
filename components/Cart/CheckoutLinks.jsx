import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const CheckoutLinks = ({ cartItemsLength }) => {
  const { status } = useSession();
  return (
    <>
      {" "}
      {cartItemsLength > 0 && (
        <div>
          <Link
            href={`${status === "authenticated" ? "/checkout" : "#"}`}
            className={`btn ${
              status === "unauthenticated"
                ? "btn-accent opacity-50 cursor-not-allowed"
                : "btn-accent"
            } btn-block mt-8`}
          >
            <div
              className="tooltip"
              data-tip={`${
                status === "authenticated" ? "Checkout" : "Login Required"
              }`}
            >
              Proceed to Checkout{" "}
            </div>
          </Link>
          {status === "unauthenticated" && (
            <Link href="/login" className={`btn btn-error btn-block mt-8`}>
              Please Login
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default CheckoutLinks;
