import { ArrowRight } from "lucide-react";
import DateRange from "../ui/DateRange";

const FilterDateModal = () => {
  return (
    <>
      <dialog id="my_modal_6" className="modal modal-bottom ">
        <div className={`modal-box `}>
          <h3 className="font-bold text-lg mb-4 text-center">Select Date</h3>
          <div className="flex justify-center">
            <DateRange />
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">
                ✕
              </button>
            </form>
          </div>
          <div className="flex text-gray-600 justify-center scroll">
            Scroll <ArrowRight />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FilterDateModal;
