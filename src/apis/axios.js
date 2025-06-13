import axios from "axios";

const responseInterceptors = () => {
  axios.interceptors.response.use(response => response.data);
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};
export default function initializeAxios() {
  axios.defaults.baseURL = `https://www.omdbapi.com`;
  setHttpHeaders();
  responseInterceptors();
}
