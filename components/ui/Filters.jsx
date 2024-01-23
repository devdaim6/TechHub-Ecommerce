"use client";
import FormInput from "@/components/Form/FormInput";
import { setSearchProduct } from "@/features/filters/filterSlice";
import {
  setProducts,
  setProductsLoading,
} from "@/features/products/productSlice";
import { getFilteredProducts } from "@/utils/filterFunction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Drawer from "./Drawer";

const Filters = ({ currentPage, filters, totalProducts }) => {
  const dispatch = useDispatch();
  const handleSearchProductChange = (e) => {
    dispatch(setSearchProduct(e.target.value));
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch(setProductsLoading({ loading: true }));
        const response = await getFilteredProducts(filters, currentPage);
        dispatch(setProducts(response?.data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setProductsLoading({ loading: false }));
      }
    })();
  }, []);

  const handleSearch = async (e) => {
    try {
      dispatch(setProductsLoading({ loading: true }));
      const response = await getFilteredProducts(filters, currentPage);
      dispatch(setProducts(response?.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setProductsLoading({ loading: false }));
    }
  };

  return (
    <>
      {" "}
      <form
        method="dialog"
        onSubmit={handleSearch}
        className=" bg-base-200 rounded-md px-3 py-4 grid gap-x-2  gap-y-4  items-center"
      >
        <div className="flex  overflow-x-hidden flex gap-x-4">
          <div className="">
            <FormInput
              type="search"
              label="search"
              name="search"
              value={filters?.searchProduct}
              size="input-sm"
              onChange={handleSearchProductChange}
            />
          </div>
          <Drawer filters={filters} />
        </div>
      </form>
      {totalProducts > 0 && (
        <div className="flex justify-end p-3  mt-1 mr-2">
          <div className="badge badge-ghost p-3">
            {totalProducts === 1 ? `${totalProducts} Product` : "Products"}{" "}
            Found{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
