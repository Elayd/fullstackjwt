import React from "react";
import MainLayout from "../layouts/MainLayout";
import {GetServerSideProps} from "next";
import {wrapper} from "../redux/store";
import {parseCookies} from "nookies";
import {setUser} from "../redux/features/authSlice";
import {UserApi} from "../redux/api";

const Index = () => {
    return (
        <>
            <MainLayout>HELLO page</MainLayout>
        </>
    );
};
export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const {access_token, refresh_token} = parseCookies(ctx);

        if (access_token) {
            store.dispatch(
                setUser({access_token: access_token, refresh_token: refresh_token})
            );
            console.log(access_token, refresh_token);
        }

        return {props: {}};

    });
export default Index;
