"use client";
import {
  fetchUserAddresses,
  selectAddress,
  selectAddresses,
  selectSelectedAddress,
} from "@/features/address/addressSlice";
import { getUserFromLocalStorage } from "@/utils/util";
import { ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  return (
    <>
      {" "}
      <h1 className="mb-2 text-lg font-semibold">Select Address </h1>
      {addresses.length > 0 ? (
        <ScrollShadow size={50} className="max-w-full max-h-52 mb-10">
          <div className="mt-2">
            <div className="flex flex-wrap">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className={`address-item p-2 mr-2 mb-4 border rounded-lg cursor-pointer min-w-full lg:max-w-[12rem] ${
                    selectedAddress === address
                      ? "border-2 border-accent text-white "
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
          </div>{" "}
        </ScrollShadow>
      ) : (
        <div className="flex items-center flex-col w-full">
          <p className="text-lg font-semibold">No Saved Addresses Found </p>
          <Link href="/addresses/add">
            <button className="btn btn-accent">Add Now</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default SelectAddress;
