import DefinedRanges from "../ui/DefinedRanges";

const FilterLabelModal = ({refetch}) => {
  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom ">
        <div className={`modal-box `}>
          <h3 className="font-bold text-lg mb-4 text-center">Select Date</h3>
          <div className="flex justify-center">
            <DefinedRanges refetch={refetch} />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FilterLabelModal;
