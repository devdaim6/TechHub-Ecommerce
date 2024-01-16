"use client";

import FormInput from "@/components/Form/FormInput";
import { setSearchProduct } from "@/features/filters/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import FilterForm from "./FilterForm";
import FilterModal from "./FilterModal";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect } from "react";
import {
  setProducts,
  setProductsLoading,
} from "@/features/products/productSlice";
import { useFilteredProducts } from "@/utils/filterFunction";
const Filters = ({ currentPage, filters }) => {
  const dispatch = useDispatch();
  const widthOfWindow = useWindowWidth();

  const handleSearchProductChange = (e) => {
    dispatch(setSearchProduct(e.target.value));
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch(setProductsLoading({ loading: true }));
        const response = await useFilteredProducts(filters, currentPage);
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
      const response = await useFilteredProducts(filters, currentPage);
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
        className=" bg-base-200 rounded-md px-3 py-4 grid gap-x-2  gap-y-8  items-center"
      >
        <div className="flex  overflow-x-hidden">
          <FormInput
            type="search"
            label="search product"
            name="search"
            value={filters?.searchProduct}
            size="input-sm"
            onChange={handleSearchProductChange}
          />
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
          className=" bg-base-200 rounded-md px-3 py-4 grid gap-x-2  gap-y-8  items-center"
        >
          <div className="lg:grid hidden">
            <FilterForm filters={filters} dispatch={dispatch} />
          </div>
        </form>
      )}
    </>
  );
};

export default Filters;
