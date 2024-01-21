import EditAddress from "@/components/Addresses/EditAddress";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditAddress addressId={params?.addressId} />
    </>
  );
};

export default page;
