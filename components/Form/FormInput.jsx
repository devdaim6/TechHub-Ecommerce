"use client";

import { SearchIcon } from "lucide-react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type,
  defaultValue,
  size,
}) => {
  return (
    <div className="form-control mt-4">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">
          {label === "search" ? "" : label}
        </span>
      </label>
      <div className="flex">
        {label == "search" && (
          <span className="flex items-center border bg-foreground  border-neutral rounded-l-lg">
            <SearchIcon />
          </span>
        )}
        <input
          type={type}
          name={name}
          spellCheck={label == "search" ? true : false}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className={`  w-[75vw] lg:w-[93vw]  input ${
            label === "search"
              ? "border-neutral border rounded-l-none"
              : "lg:input-bordered"
          } ${size}`}
        />
      </div>
    </div>
  );
};
export default FormInput;
