"use client";
import { getUserFromLocalStorage } from "@/utils/util";
import { AlertTriangle, ArrowRightToLineIcon, Edit3Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import RenderOrderStatus from "../ui/RenderOrderStatus";
import ProductCancelModal from "./ProductCancelModal";
const OrderList = ({ order, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCancelOrder = async (orderCode) => {
    const res = await fetch("/api/orders?cancelledBy=user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getUserFromLocalStorage()?.id,
        orderCode,
        orderStatus: "cancelled",
      }),
      cache: "no-store",
    });
    const response = await res.json();
    if (response?.success) {
      setIsOpen(false);
      toast.success("Order Cancelled");
    }
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <>
        <div className="divider">Order #{index + 1}</div>
        <ProductCancelModal
          handleCancelOrder={handleCancelOrder}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          orderCode={order?.orderCode}
        />
        <div>
          <div className="w-full h-full mt-5 ">
            <div
              className={`  lg:mx-4 mx-2 border rounded-md border-neutral-content/60 p-3  h-70 mb-20`}
            >
              <div className="flex flex-wrap ">
                <span className="flex-grow ml-1 text-[10px] lg:text-[.8rem]">
                  Order Placed{" "}
                  <p className="">
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </p>
                </span>
                <span className="flex-grow text-center text-[10px] lg:text-[.8rem]">
                  Total{" "}
                  <p className="font-semibold"> &#8377;{order?.totalAmount}</p>
                </span>
                <span className="flex-grow text-center text-[10px] lg:text-[.8rem]">
                  SHIP TO{" "}
                  <p className="text-blue-500 cursor-pointer">
                    <Link href={`/profile/`}>
                      {order?.shippingAddress?.name}
                    </Link>
                  </p>
                </span>
                <span className="flex-col flex gap-y-1 text-[8px] lg:text-[.8rem]">
                  ORDER ID{" "}
                  <span className=" text-[10px] lg:text-[1rem]">
                    #{order?.orderCode}
                  </span>
                </span>
              </div>
              <div>
                <div className="divider divider-neutral-content"></div>
                <div className="flex w-2/6 h-6 mx-0 mt-2 text-xs  lg:w-1/6   rounded-md">
                  <RenderOrderStatus orderStatus={order?.orderStatus} />
                </div>
                {order?.orderItems &&
                  order?.orderItems?.map((orderItem, index) => (
                    <div key={index} className={`flex mb-1 flex-col`}>
                      <div
                        className={`flex my-2  ${
                          order?.orderStatus === "cancelled" ? "opacity-25" : ""
                        }`}
                      >
                        <img
                          src={orderItem?.imageUrl}
                          className="w-2/6 h-32 mt-2 border rounded-md lg:w-1/6"
                          alt="productImage"
                        />
                        <Link
                          scroll={false}
                          href={`/products/${decodeURIComponent(
                            orderItem?.name
                          )}/${decodeURIComponent(order?.productCode)}/${
                            orderItem?.productId
                          }`}
                        >
                          <p className="flex items-center w-full p-2 ml-2">
                            {orderItem?.name}
                          </p>
                        </Link>
                      </div>
                      <div className="divider"></div>
                      <div
                        className={`flex justify-between   ${
                          order?.orderStatus === "cancelled" ? "opacity-25" : ""
                        }`}
                      >
                        <p>
                          <span className="">Payment Method</span> :{" "}
                          <span className="uppercase font-semibold ">
                            {order?.paymentOption}
                          </span>
                        </p>
                        <p>
                          <span className="">Shipping</span> :{" "}
                          <span className="uppercase font-semibold ">
                            {order?.pickUpAtStore
                              ? "Pickup At Store"
                              : "To be Delivered"}
                          </span>
                        </p>
                        <p>
                          <span className="">Payment Status</span> :{" "}
                          <span className="uppercase font-semibold ">
                            {order?.paymentStatus}
                          </span>
                        </p>
                      </div>
                      <div className="divider"></div>
                      <div className="flex justify-between text-blue-500 ">
                        {order?.orderStatus !== "cancelled" ? (
                          order?.orderStatus === "delivered" ? (
                            <p className="text-accent font-semibold text-lg">
                              Delievered
                            </p>
                          ) : (
                            <button
                              className="flex text-red-500 gap-x-1 "
                              onClick={() => handleOpen()}
                            >
                              Cancel Order <AlertTriangle size={20} />
                            </button>
                          )
                        ) : (
                          <div className="text-neutral-content text-sm gap-x-2 flex">
                            <span className="font-semibold">Reason</span>{" "}
                            <ArrowRightToLineIcon />{" "}
                            <span className="text-xs mt-1 capitalize">
                              {order?.orderCancellationReason}
                            </span>
                          </div>
                        )}
                        <span className="ml-auto cursor-pointer ">
                          <Link
                            scroll={true}
                            className={`flex  `}
                            href={`${`/products/reviews/${orderItem?.productId}/post`}`}
                          >
                            <Edit3Icon size={20} /> write a review
                          </Link>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default OrderList;
