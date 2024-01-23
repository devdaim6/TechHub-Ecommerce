"use client";
import { useOrder } from "@/hooks/useOrder";
import {
  getUserFromLocalStorage,
  openFilterDate,
  openFilterLabel,
} from "@/utils/util";
import { CalendarDaysIcon, FilterIcon, PackageSearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ScreenLoading from "../ui/ScreenLoading";
import FilterDateModal from "./FilterDateModal";
import FilterLabelModal from "./FilterLabelModal";
import OrderList from "./OrderList";

const MyOrders = () => {
  const date = useSelector((state) => state.dateRange.date);
  const { data, isLoading, refetch } = useOrder(
    getUserFromLocalStorage()?.id,
    date
  );
  useEffect(() => {
    refetch();
  }, [date]);

  return (
    <>
      {!data || isLoading ? (
        <ScreenLoading
          upperText={"Your Orders are being Loaded"}
          lowerText={"please wait a moment..."}
        />
      ) : (
        <div>
          <h1 className="text-xl pt-4  font-semibold text-center">
            <div className="divider">My Orders</div>
          </h1>
          <div className="flex justify-end gap-x-4  mr-4 mb-5 pb-5">
            <div onClick={openFilterLabel} className="cursor-pointer">
              <FilterIcon />
              <FilterLabelModal />
            </div>
            <div onClick={openFilterDate} className="cursor-pointer">
              <CalendarDaysIcon />
              <FilterDateModal />
            </div>
            <div className="flex bg-neutral-content/30  rounded-md ">
              <span className="mx-1 my-1 cursor-pointer">
                <label htmlFor="search">
                  <PackageSearchIcon size={18} />
                </label>
              </span>
              <input
                id="search"
                type="search"
                className="ml-1 mr-0 bg-neutral-content/10 outline-none rounded-r-md "
                placeholder="   Search Your Orders"
              />
            </div>
          </div>
          {data &&
            data.map((order, index) => (
              <OrderList
                refetch={refetch}
                key={index}
                index={index}
                order={order}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default MyOrders;
