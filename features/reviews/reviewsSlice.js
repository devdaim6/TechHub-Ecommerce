import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  title: "",
  image: "",
  comment: "",
  rating: 5,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviewName: (state, action) => {
      const name = action.payload;
      state.name = name;
    },

    setReviewTitle: (state, action) => {
      const title = action.payload;
      state.title = title;
    },

    setReviewImage: (state, action) => {
      const image = action.payload;
      state.image = image;
    },

    setReviewComment: (state, action) => {
      const comment = action.payload;
      state.comment = comment;
    },

    setReviewRating: (state, action) => {
      const rating = action.payload;
      state.rating = rating;
    },

    clearReview: (state, action) => {
      return initialState;
    },
  },
});

export const {
  setReviewName,
  setReviewTitle,
  setReviewImage,
  setReviewComment,
  setReviewRating,
  clearReview,
} = reviewsSlice.actions;
export default reviewsSlice.reducer;
