import api from "./axiosInstance";

export const authService = {
  getUser: async () => {
    const { data } = await api.get("/user/getuser");
    return data;
  },
  login: async (credentials: any) => {
    const { data } = await api.post("/user/login", credentials);
    return data;
  },
  register: async (userData: any) => {
    const { data } = await api.post("/user/register", userData);
    return data;
  },
  logout: async () => {
    const { data } = await api.get("/user/logout");
    return data;
  },
};
