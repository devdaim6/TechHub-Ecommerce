"use client";
import React from "react";

const SavedAddressSkeleton = ({ length }) => {
  const skeletons = Array.from({ length: length || 3 }).map((_, index) => (
    <div key={index} className="flex flex-col  mx-1 lg:w-full w-[90vw]  ">
      <div className="skeleton h-32 w-full"></div>
    </div>
  ));

  return <>{skeletons}</>;
};

export default SavedAddressSkeleton;
