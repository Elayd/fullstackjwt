import { GetServerSideProps } from 'next';
import { wrapper } from '../store';
import { parseCookies } from 'nookies';
import { UserApi } from '../api';
import { setUser } from './authSlice';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async (ctx) => {
    try {
      const {access_token, refresh_token} = parseCookies(ctx)
      const userData = await UserApi.getMe(access_token);
      store.dispatch(setUser({access_token: access_token, refresh_token: refresh_token }))
      console.log(userData);
      return {props:{}}
    } catch (e) {
      console.log(e);
      return {props: {}}
    }
  })