"use client";
import {
  fetchUserAddresses,
  selectAddresses,
  selectStatus,
  setAddress,
} from "@/features/address/addressSlice";
import { getUserFromLocalStorage } from "@/utils/util";
import { FolderEditIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import SavedAddressSkeleton from "../ui/SavedAddressSkeleton";

const SavedAddresses = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchUserAddresses(getUserFromLocalStorage()?.id));
  }, [dispatch, addresses.length]);

  const handleAddressDelete = async (addressId) => {
    try {
      const toastId = toast.loading("Deleting Address...");

      const response = await fetch(
        `/api/user/${getUserFromLocalStorage()?.id}/addresses`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addressId }),
        }
      );

      const responseData = await response.json();

      toast.dismiss(toastId);
      toast.success(
        `Address Removed. ${responseData.addresses.length} addresses remaining`
      );
      dispatch(setAddress(responseData?.addresses));
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Error While Removing Address");
    }
  };
  return (
    <>
      <div className="min-h-screen p-4">
        <div className="border p-4 mb-4 rounded-md flex items-center justify-center cursor-pointer">
          <p className="text-center">
            <Link href="/addresses/add">Add New Address</Link>
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Saved Addresses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {status == "idle" ||
            (status == "loading" && (
              <SavedAddressSkeleton length={addresses?.length} />
            ))}
          {status == "succeeded" && addresses.length < 1 ? (
            <>No Saved Addresses</>
          ) : (
            addresses?.map((address) => (
              <div
                key={address._id}
                className="flex justify-between items-center border p-4 rounded-md"
              >
                <div>
                  <p className="font-bold">{address.name}</p>
                  <p>{address.landmark}</p>
                  <p>
                    {address.city}, {address.state} - {address.zipCode}
                  </p>
                  <p>{address.phone}</p>
                </div>
                <div className="flex gap-x-2">
                  <button
                    type="button"
                    onClick={() => handleAddressDelete(address._id)}
                    className="btn btn-error w-10 h-10"
                  >
                    <span>
                      <Trash2Icon size={20} />
                    </span>
                  </button>
                  <button type="button" className="w-10 h-10 btn btn-accent">
                    <Link href={`/addresses/edit/${address._id}`}>
                      <FolderEditIcon size={20} />
                    </Link>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SavedAddresses;
