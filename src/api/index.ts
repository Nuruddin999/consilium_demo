import axios from "axios";

export const diagnostApi = axios.create({
  baseURL: process.env.REACT_APP_BASIC_URL,
});