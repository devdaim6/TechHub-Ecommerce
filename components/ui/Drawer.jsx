import { FilterIcon } from "lucide-react";
import FilterForm from "./FilterForm";

const Drawer = ({ filters }) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="  cursor-pointer drawer-button">
          <FilterIcon size={25} className="mt-8" />
        </label>
      </div>
      <div className="drawer-side  lg:mt-[4.58rem] mt-[4rem] z-30 ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul>
          <FilterForm filters={filters} />
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
