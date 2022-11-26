import axios from "axios";

const instance = axios.create({
  baseURL: "https://fullstackjwt.herokuapp.com",
});

export const UserApi = {
  async getMe(access_token: string) {
    const { data } = await instance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  },
};
