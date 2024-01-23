
const AddressForm = ({ data }) => {
  return (
    <>
      {" "}
      <input
        name="name"
        type="text"
        placeholder={data?.name?data?.name:"Name *"}
        required
        className="input input-bordered"
      />
      <input
        name="phone"
        type="tel"
        placeholder={data?.phone?data?.phone:"Phone *"}
        maxLength={10}
        required
        className="input input-bordered"
      />
      <input
        name="landmark"
        required
        placeholder={data?.landmark?data?.landmark:"Landmark *"}
        type="text"
        className="input input-bordered"
      />
      <input
        name="city"
        placeholder={data?.city?data?.city:"City *"}
        required
        type="text"
        className="input input-bordered"
      />
      <input
        name="state"
        placeholder={data?.state?data?.state:"State *"}
        type="text"
        className="input input-bordered"
      />
      <input
        required
        name="zipCode"
        placeholder={data?.zipCode?data?.zipCode:"Zip Code *"}
        type="numeric"
        maxLength={6}
        className="input input-bordered"
      />
    </>
  );
};

export default AddressForm;
