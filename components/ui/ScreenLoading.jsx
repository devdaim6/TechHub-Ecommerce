"use client";
import React from "react";

const ScreenLoading = ({ upperText, lowerText }) => {
  return (
    <>
      <div className="flex flex-col gap-y-2 items-center justify-center h-screen">
        <span className=" font-semibold text-lg ">{upperText}</span>
        <span className="loading w-24  h-24 loading-ring loading-lg"></span>
        <span className=" font-md text-sm ">{lowerText}</span>
      </div>
    </>
  );
};

export default ScreenLoading;
