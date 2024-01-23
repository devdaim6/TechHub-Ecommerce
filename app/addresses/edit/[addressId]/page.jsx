import EditAddress from "@/components/Addresses/EditAddress";

const page = ({ params }) => {
  return (
    <>
      <EditAddress addressId={params?.addressId} />
    </>
  );
};

export default page;
