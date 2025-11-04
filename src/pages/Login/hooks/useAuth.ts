import axios from "axios";
import { baseURL } from "../../../constants";
import { LoginValues } from "../types";
export const useAuth = ({ userName, password }: LoginValues) => {
  const login = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/authenticate`, {
        userName,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { login };
};
