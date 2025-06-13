import axios from "axios";

const show = (searchKey, page) =>
  axios.get("/", {
    params: {
      s: `${searchKey}`,
      apikey: process.env.REACT_APP_OMDB_API_KEY,
      page: `${page}`,
    },
  });

const fetch = searchId =>
  axios.get("/", {
    params: {
      i: `${searchId}`,
      apikey: process.env.REACT_APP_OMDB_API_KEY,
    },
  });

export const moviesApi = { show, fetch };
