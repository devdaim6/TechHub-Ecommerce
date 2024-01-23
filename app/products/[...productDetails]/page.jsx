import SingleProduct from "@/components/Products/SingleProduct";
const page = ({ params }) => {
  let [name, productCode, productId] = params?.productDetails;
  return (
    <>
      <SingleProduct
        name={name}
        productCode={productCode}
        productId={productId}
      />
    </>
  );
};

export default page;
