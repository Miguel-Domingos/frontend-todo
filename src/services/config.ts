import axios from "axios";
const { BACKEND_API_URL } = import.meta.env;

export const AxiosConfig = axios.create({
  baseURL: BACKEND_API_URL,
});
