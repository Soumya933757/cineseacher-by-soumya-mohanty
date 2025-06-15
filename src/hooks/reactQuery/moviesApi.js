import { QUERY_KEYS } from "constants/query";

import { moviesApi } from "apis/movies";
import { useQuery } from "react-query";

export const useShowMovies = (searchKey, page, filterData) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchKey, page, filterData],
    queryFn: () => moviesApi.show(searchKey, page, filterData),
    keepPreviousData: true,
  });

export const useFetchMovie = searchId =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIE, searchId],
    queryFn: () => moviesApi.fetch(searchId),
  });
