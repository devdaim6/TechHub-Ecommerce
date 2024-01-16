import React from "react";
import FilterForm from "./FilterForm";
import { FilterIcon } from "lucide-react";

const FilterModal = ({ filters, dispatch, handleSearchProductChange }) => {
  return (
    <>
      {" "}
      <label htmlFor="my_modal_7" className="btn lg:hidden">
        <FilterIcon size={25} className="mt-9" />
      </label>
      <input type="checkbox" id="my_modal_7" className="modal-toggle " />
      <div className="modal" role="dialog">
        <div className="modal-box">
            <button
              htmlFor="my_modal_7 "
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={()=>{document.getElementById('my_modal_7').checked = false}}
            >
              ✕
            </button>
          <FilterForm
            filters={filters}
            dispatch={dispatch}
            handleSearchProductChange={handleSearchProductChange}
          />{" "}
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

export default FilterModal;
