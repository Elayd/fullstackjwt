import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { GetServerSideProps } from "next";
import { wrapper } from "../../redux/store";
import { parseCookies } from "nookies";
import { UserApi } from "../../redux/api";
import { setUser } from "../../redux/features/authSlice";

const Index = () => {
  return <MainLayout>Profile page</MainLayout>;
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const { access_token, refresh_token } = parseCookies(ctx);
      const userData = await UserApi.getMe(access_token);
      store.dispatch(
        setUser({ access_token: access_token, refresh_token: refresh_token })
      );
      console.log(userData);
      return { props: {} };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  });
export default Index;
