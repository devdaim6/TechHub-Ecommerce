"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/features/date/dateSlice";
import { DefinedRange } from "react-date-range";

const DefinedRanges = ({ refetch }) => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.dateRange.date);
  const handleDateChange = (item) => {
    dispatch(setDate({ selection: item.selection }));
    refetch();
  };
  return (
    <>
      <DefinedRange
        onChange={handleDateChange}
        ranges={date}
        rangeColors={["#3d91ff", "#3ecf8e", "#fed14c"]}
      />
    </>
  );
};

export default DefinedRanges;
