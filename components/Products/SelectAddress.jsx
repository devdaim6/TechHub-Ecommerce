"use client";
import { getUserFromLocalStorage } from "@/utils/util";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAddresses,
  selectAddress,
  selectAddresses,
  selectSelectedAddress,
} from "@/features/address/addressSlice";
const SelectAddress = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const selectedAddress = useSelector(selectSelectedAddress);

  useEffect(() => {
    dispatch(fetchUserAddresses(getUserFromLocalStorage()?.id));
  }, [dispatch]);

  const handleAddressClick = (address) => {
    dispatch(selectAddress(address));
  };

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await axios.get(
          `/api/user/${getUserFromLocalStorage()?.id}?field=savedAddresses`
        );
        setAddresses(response?.data);
      } catch (error) {
        console.error("Error fetching user addresses:", error);
      }
    };
    fetchUserAddresses();
  }, []);

  return (
    <div className="max-w-full overflow-x-auto mt-2 overflow-y-auto max-h-52 mb-10">
      <h1 className="mb-2 text-lg font-semibold">Select Address:</h1>
      <div className="flex flex-wrap">
        {addresses?.map((address, index) => (
          <div
            key={index}
            className={`address-item p-2 mr-2 mb-4 border rounded cursor-pointer min-w-full lg:max-w-[12rem] ${
              selectedAddress === address
                ? "border-2 border-accent text-white"
                : "border border-gray-200"
            }`}
            onClick={() => handleAddressClick(address)}
          >
            <p className="font-bold">{address.name}</p>
            <p>{address.landmark}</p>
            <p>
              {address.city}, {address.state} - {address.zipCode}
            </p>
            <p>{address.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectAddress;
