import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authReducer from "./features/authSlice";
import { createWrapper } from "next-redux-wrapper";
import { setupListeners } from "@reduxjs/toolkit/query";

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};
export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

export const wrapper = createWrapper<RootStore>(makeStore);
