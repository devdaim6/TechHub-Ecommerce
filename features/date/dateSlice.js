import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), -7),
        key: "selection",
      },
    ],
  },
  reducers: {
    setDate: (state, action) => {
      state.date = [
        {
          startDate: format(
            action.payload.selection.startDate,
            "yyyy-MM-dd'T'HH:mm:ssXXX"
          ),
          endDate: format(
            action.payload.selection.endDate,
            "yyyy-MM-dd'T'HH:mm:ssXXX"
          ),
          key: "selection",
        },
      ];
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
