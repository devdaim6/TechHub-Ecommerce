import {
  setProducts,
  setProductsLoading,
} from "@/features/products/productSlice";
import { getFilteredProducts } from "@/utils/filterFunction";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const Pagination = ({ currentPage, totalPages, filters }) => {
  const dispatch = useDispatch();

  const handlePrevClick = async () => {
    if (currentPage > 1) {
      dispatch(setProductsLoading({ loading: true }));
      const newPage = currentPage - 1;
      try {
        const response = await getFilteredProducts(filters, newPage);
        dispatch(setProducts(response?.data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setProductsLoading({ loading: false }));
      }
    }
  };

  const handleNextClick = async () => {
    dispatch(setProductsLoading({ loading: true }));
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      try {
        const response = await getFilteredProducts(filters, newPage);
        dispatch(setProducts(response?.data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setProductsLoading({ loading: false }));
      }
    }
  };
  return (
    <>
      {totalPages > 0 && (
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-md">{currentPage}</span> of{" "}
            <span className="font-semibold text-md">{totalPages}</span>
          </span>
          <div className="inline-flex gap-x-1 my-2 xs:mt-0">
            <button
              onClick={handlePrevClick}
              disabled={currentPage === 1 ? true : false}
              className="btn glass  "
            >
              <ArrowLeft size={15} />
              Prev
            </button>

            <button
              onClick={handleNextClick}
              className="btn glass"
              disabled={currentPage == totalPages ? true : false}
            >
              Next
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
