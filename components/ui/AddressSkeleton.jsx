"use client";
import React from "react";

const AddressSkeleton = ({upperText,lowerText}) => {
  return (
    <>
      <div className="flex flex-col gap-4  w-full mb-10">
        <div className="skeleton h-32 w-full"></div>
      </div>
    </>
  );
};

export default AddressSkeleton;
