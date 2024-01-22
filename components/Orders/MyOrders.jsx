"use client";
import {
  getUserFromLocalStorage,
  openFilterDate,
  openFilterLabel,
} from "@/utils/util";
import axios from "axios";
import { CalendarDaysIcon, FilterIcon, PackageSearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterLabelModal from "./FilterLabelModal";
import FilterDateModal from "./FilterDateModal";
import OrderList from "./OrderList";
import ScreenLoading from "../ui/ScreenLoading";

const MyOrders = () => {
  const date = useSelector((state) => state.dateRange.date);
  const [myOrders, setMyOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchOrders = async () => {
        const response = await axios.get(
          `/api/user/${getUserFromLocalStorage()?.id}?field=orders&startDate=${
            date[0]?.startDate
          }&endDate=${date[0]?.endDate}`
        );
        setMyOrders(response?.data);
        console.log(response.data);
      };
      fetchOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [date]);

  return (
    <>
      {!myOrders || loading ? (
        <ScreenLoading />
      ) : (
        <div>
          <h1 className="text-xl py-4  font-semibold text-center">
            <div className="divider">My Orders</div>
          </h1>
          <div className="flex justify-end gap-x-4  mr-4 mt-5">
            <div onClick={openFilterLabel} className="cursor-pointer">
              <FilterIcon />
              <FilterLabelModal />
            </div>
            <div onClick={openFilterDate} className="cursor-pointer">
              <CalendarDaysIcon />
              <FilterDateModal />
            </div>
            <div className="flex bg-neutral   rounded-md ">
              <span className="mx-1 my-1 ">
                <PackageSearchIcon size={18} />
              </span>
              <input
                type="text"
                className="ml-1 mr-0 bg-neutral outline-none rounded-r-md "
                placeholder="Search Your Orders"
              />
            </div>
          </div>
          {myOrders &&
            myOrders.map((order, index) => (
              <OrderList key={index} index={index} order={order} />
            ))}
        </div>
      )}
    </>
  );
};

export default MyOrders;
