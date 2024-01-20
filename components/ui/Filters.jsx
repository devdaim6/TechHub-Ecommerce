"use client";

import FormInput from "@/components/Form/FormInput";
import { setSearchProduct } from "@/features/filters/filterSlice";
import { useDispatch } from "react-redux";
import FilterForm from "./FilterForm";
import FilterModal from "./FilterModal";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect } from "react";
import {
  setProducts,
  setProductsLoading,
} from "@/features/products/productSlice";
import { getFilteredProducts } from "@/utils/filterFunction";
const Filters = ({ currentPage, filters, totalProducts }) => {
  const dispatch = useDispatch();
  const widthOfWindow = useWindowWidth();

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
        <div className="flex  overflow-x-hidden">
          <div className="lg:w-1/2">
            <FormInput
              type="search"
              label="search product"
              name="search"
              value={filters?.searchProduct}
              size="input-sm"
              onChange={handleSearchProductChange}
            />
          </div>
          {widthOfWindow < 799 && (
            <FilterModal
              filters={filters}
              dispatch={dispatch}
              handleSearchProductChange={handleSearchProductChange}
            />
          )}
        </div>
      </form>
      {widthOfWindow > 799 && (
        <form
          method="dialog"
          onSubmit={handleSearch}
          className=" bg-base-200 rounded-md px-3 py-4 grid gap-x-2  gap-y-1  items-center"
        >
          <div className="lg:grid hidden">
            <FilterForm filters={filters} dispatch={dispatch} />
          </div>
        </form>
      )}
      {totalProducts > 0 && (
        <div className="flex justify-between bg-neutral">
          <span className="py-1 text-accent">{totalProducts} Products Found </span>
        </div>
      )}
    </>
  );
};

export default Filters;
