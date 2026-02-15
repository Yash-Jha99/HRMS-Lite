import axios from "redaxios";
import { API_URL } from "./constants";

const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;
