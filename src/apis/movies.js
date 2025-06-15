import axios from "axios";

const show = (searchKey, page, filterData) =>
  axios.get("/", {
    params: {
      s: `${searchKey}`,
      apikey: process.env.REACT_APP_OMDB_API_KEY,
      page: `${page}`,
      y: filterData.year || undefined,
      type:
        filterData.movie && !filterData.series
          ? "movie"
          : !filterData.movie && filterData.series
          ? "series"
          : undefined,
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
