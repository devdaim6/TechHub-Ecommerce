"use client";
import { getUserFromLocalStorage } from "@/utils/util";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AddressForm from "./AddressForm";

const AddAddress = () => {
  const router = useRouter();
  const handleAddingAddress = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    const response = await axios.post(
      `/api/user/${getUserFromLocalStorage()?.id}/addresses`,
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
      <form
        className="flex flex-col gap-y-4 p-4"
        onSubmit={handleAddingAddress}
      >
        <h4 className="font-semibold mx-auto text-xl capitalize">
          Address Information
        </h4>
        <AddressForm />
        <div className="mt-4">
          <button type="submit" className="btn btn-accent btn-block">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddAddress;
