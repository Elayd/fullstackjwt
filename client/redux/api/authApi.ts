import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333/auth",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/local/signin",
          method: "post",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/local/signup",
          method: "post",
          body,
        };
      },
    }),
    getMe: builder.mutation({
      query: () => {
        return {
          url: "/me",
          method: "get",
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
