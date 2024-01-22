import { closeFilterDate } from "@/utils/util";
import { createSlice } from "@reduxjs/toolkit";
import { addDays  } from "date-fns";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: [
      {
        startDate: addDays(new Date(), -7).toISOString(),
        endDate: new Date().toISOString(),
        key: "selection",
      },
    ],
  },
  reducers: {
    setDate: (state, action) => {
      state.date = [
        {
          startDate: new Date(action.payload.selection.startDate).toISOString(),
          endDate: new Date(action.payload.selection.endDate).toISOString(),
          key: "selection",
        },
      ];
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
