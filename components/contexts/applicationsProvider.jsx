"use client";

import { useGetAllApplicationsQuery } from "@/store/api/applicationApi";
import {
  selectPage,
  selectTotalPage,
  setApplications,
  setFetchingStates,
  setTotalPages,
} from "@/store/features/applicatonsSlice";
import { getToken } from "@/utils/authHelpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ApplicationsProvider = ({ children }) => {
  const page = useSelector(selectPage);
  console.log(page);
  const { isLoading, isSuccess, error, data, refetch } =
    useGetAllApplicationsQuery({ page: page === 0 ? 1 : page, limit: 20 });
  const applications = data?.data.applications.data;
  const dispatch = useDispatch();
  const token = getToken();
  console.log(data);
  const totalPages = data?.data?.applications?.meta?.lastPage;

  useEffect(() => {
    const fetchingStates = {
      isLoading,
      isSuccess,
      error,
      //   refetch,
    };
    dispatch(setApplications(applications));
    dispatch(setFetchingStates(fetchingStates));
    dispatch(setTotalPages(totalPages));
  }, [applications, isLoading, isSuccess, error]);

  useEffect(() => {
    refetch();
  }, [token]);

  useEffect(() => {
    refetch();
    dispatch(setApplications(applications));
  }, [page]);

  return <>{children}</>;
};

export default ApplicationsProvider;
