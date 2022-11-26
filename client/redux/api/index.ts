import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3333",
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
