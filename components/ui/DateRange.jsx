"use client";
import { DateRangePicker } from "react-date-range";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/features/date/dateSlice";
const DateRange = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.dateRange.date);
  const handleDateChange = (item) => {
    dispatch(setDate({ selection: item.selection }));
  };
  return (
    <>
      <div className="date-range-picker-container">
        <DateRangePicker
          onChange={handleDateChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ariaLabels={{
            dateInput: {
              selection: {
                startDate: "start date input of selction",
                endDate: "end date input of selction",
              },
            },
            monthPicker: "month picker",
            yearPicker: "year picker",
            prevButton: "previous month button",
            nextButton: "next month button",
          }}
          rangeColors={["#3ecf8e"]}
          editableDateInputs={true}
          ranges={date}
          fixedHeight={true}
          maxDate={new Date()}
          direction="hotizontal"
        />
      </div>
    </>
  );
};

export default DateRange;
