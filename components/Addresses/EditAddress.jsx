"use client";
import { useAddress } from "@/hooks/useAddress";
import { getUserFromLocalStorage } from "@/utils/util";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ScreenLoading from "../ui/ScreenLoading";
import AddressForm from "./AddressForm";

const EditAddress = ({ addressId }) => {
  const { data, isLoading } = useAddress(
    addressId,
    getUserFromLocalStorage()?.id
  );

  const router = useRouter();

  const handleEditAddress = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    const response = await axios.patch(
      `/api/user/${
        getUserFromLocalStorage()?.id
      }/addresses?address=${addressId}`,
      formData
    );
    if (response?.data?.success) {
      e.target.reset();
      toast.success(response?.data?.message);
      router.push("/addresses");
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <ScreenLoading />
      ) : (
        <form
          className="flex flex-col gap-y-4 p-4"
          onSubmit={handleEditAddress}
        >
          <h4 className="font-semibold mx-auto text-xl capitalize">
            Edit Address Information
          </h4>
          <AddressForm data={data} />
          <div className="mt-4">
            <button type="submit" className="btn btn-accent btn-block">
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditAddress;
