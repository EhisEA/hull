import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken(); // Get the token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    updateUserBioData: builder.mutation({
      query(payload) {
        return {
          url: `/user`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getCurrentUser: builder.query({
      query() {
        return {
          url: `/user`,
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getUser: builder.query({
      query(userId) {
        return {
          url: `/user/${userId}`,
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getAllUsers: builder.query({
      query({ page, limit }) {
        return {
          url: `/users?page=${page}&&limit=${limit}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getAllStaffs: builder.query({
      query() {
        return {
          url: `/staff`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    createStaff: builder.mutation({
      query(staffId) {
        return {
          url: `/staff/${staffId}`,
          method: "POST",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getSingleStaff: builder.query({
      query(staffId) {
        return {
          url: `/staff/${staffId}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteStaff: builder.mutation({
      query(userId) {
        return {
          url: `/users/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateStaff: builder.mutation({
      query(staffId) {
        return {
          url: `/staff/${staffId}`,
          method: "PUT  ",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useUpdateUserBioDataMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useGetUserQuery,
  useGetAllStaffsQuery,
  useUpdateStaffMutation,
  useGetSingleStaffQuery,
} = userApi;
