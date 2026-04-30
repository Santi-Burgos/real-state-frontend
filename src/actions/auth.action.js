import { axiosInstance } from "../apiFrontend";

export const loginAuth = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post(
      "auth/",
      { email, password }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error login: ", error);
    throw error;
  }
};