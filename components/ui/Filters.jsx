"use client";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import FormRange from "@/components/Form/FormRange";
import FormCheckbox from "@/components/Form/FormCheckbox";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const Filters = ({ categoriesList }) => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  console.log(params);
  const { search,  category, shipping, order, price } = params;

  return (
    <form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={categoriesList}
        size="select-sm"
        defaultValue={category}
      />

      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={order}
      />
      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={price}
      />
      {/* SHIPPING */}
      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link href="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </form>
  );
};
export default Filters;
