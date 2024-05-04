import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { applicationApi } from "./api/applicationApi";
import { userApi } from "./api/userApi";
import { cloudinaryApi } from "./api/cloudinaryApi";
import { generalAPI } from "./api/generalApi";
import { transactionsApi } from "./api/transactionsApi";
import userReducer from "./features/userSlice";
import applicationsReducer from "./features/applicatonsSlice";
import transactionsReducer from "./features/transactionSlice";
import statisticsReducer from "./features/statisticsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    applications: applicationsReducer,
    transactions: transactionsReducer,
    statistics: statisticsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
    [generalAPI.reducerPath]: generalAPI.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      applicationApi.middleware,
      userApi.middleware,
      cloudinaryApi.middleware,
      generalAPI.middleware,
      transactionsApi.middleware,
    ]),
});

export default store;
