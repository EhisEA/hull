// roleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  totalPages: 1,
  fetchingStates: {
    isLoading: false,
    isSuccess: false,
    error: "",
    // refetch:,
  },
  applications: [],
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setFetchingStates: (state, action) => {
      state.fetchingStates = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setApplications, setFetchingStates, setPage, setTotalPages } =
  applicationsSlice.actions;
export const selectApplications = (state) => state.applications.applications;
export const selectPage = (state) => state.applications.page;
export const selectTotalPage = (state) => state.applications.totalPages;
export const selectFetchingStates = (state) =>
  state.applications.fetchingStates;
export default applicationsSlice.reducer;
