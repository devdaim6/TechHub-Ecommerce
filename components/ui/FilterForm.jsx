"use client";
import FormCheckbox from "@/components/Form/FormCheckbox";

import FormRange from "@/components/Form/FormRange";
import FormSelect from "@/components/Form/FormSelect";
import {
  resetFilters,
  setFreeShipping,
  setInStock,
  setPriceRange,
  setSortBy,
} from "@/features/filters/filterSlice";

const FilterForm = ({ filters, dispatch }) => {
  // const handleTagsChange = (e) => {
  //   const selectedOptions = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   dispatch(setTags(selectedOptions));
  // };

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };
  const handleInStockChange = (e) => {
    dispatch(setInStock(e.target.checked));
  };

  const handlePriceRangeChange = (e) => {
    dispatch(setPriceRange(e));
  };

  const handleFreeShippingChange = (e) => {
    dispatch(setFreeShipping(e.target.checked));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <>
      <div className=" lg:grid  grid-cols-1 gap-4    lg:grid-cols-2">
        <div>
          <FormSelect
            label="Sort by"
            name="sortBy"
            list={[
              {
                label: "Featured",
                value: "featured",
              },
              {
                label: "Price: Low to High",
                value: "priceLowToHigh",
              },
              {
                label: "Price: High to Low",
                value: "priceHighToLow",
              },
              {
                label: "Newest Arrivals",
                value: "newest",
              },
            ]}
            size="select-sm"
            value={filters.sortBy}
            onChange={handleSortByChange}
            defaultValue="featured"
          />
        </div>
        <div>
          <FormRange
            name="price"
            label="Select Price"
            size="range-sm"
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onChange={handlePriceRangeChange}
          />
        </div>

        {/* <div>
        <FormMultipleSelect
          label={"Tags"}
          name={"tags"}
          tags={filters.tags}
          onChange={handleTagsChange}
          list={[
            { id: 1, label: "New", value: "New" },
            { id: 2, label: "Featured", value: "Featured" },
            { id: 3, label: "Stationary", value: "Stationary" },
            { id: 4, label: "Electronics", value: "Electronics" },
            { id: 5, label: "Customized Mugs", value: "Mugs" },
            { id: 6, label: "Customized Shirt Printing", value: "Shirts" },
            { id: 7, label: "Customized Vector Frames", value: "Vector" },
          ]}
          defaultValue={["New"]}
          size={"select-sm"}
        />
      </div> */}
        <div>
          <FormCheckbox
            name="shipping"
            label="Free Shipping"
            size="checkbox-sm"
            defaultValue={filters.freeShipping}
            isChecked={filters.freeShipping}
            onChange={handleFreeShippingChange}
          />
        </div>
        <div>
          <FormCheckbox
            name="instock"
            label="In Stock"
            size="checkbox-sm"
            defaultValue={filters.inStock}
            isChecked={filters.inStock}
            onChange={handleInStockChange}
          />
        </div>

        <div className="col-span-2">
          <div className="flex my-4">
            <button type="submit" className="btn btn-accent btn-sm w-1/2  ">
              Search
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-error btn-sm w-1/2 ml-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterForm;
