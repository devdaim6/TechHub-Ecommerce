"use client";
import React from "react";

const CardSkeleton = ({ length }) => {
  const skeletons = Array.from({ length: length || 5 }).map((_, index) => (
    <div key={index} className="flex flex-col gap-4 mx-5 lg:w-52 w-[90vw] my-5">
      <div className="skeleton h-52 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  ));

  return <>{skeletons}</>;
};

export default CardSkeleton;
