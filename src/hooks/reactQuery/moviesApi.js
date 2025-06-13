import { QUERY_KEYS } from "constants/query";

import { moviesApi } from "apis/movies";
import { useQuery } from "react-query";

export const useShowMovies = (searchKey, page) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchKey, page],
    queryFn: () => moviesApi.show(searchKey, page),
    keepPreviousData: true,
  });

export const useFetchMovie = searchId =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIE, searchId],
    queryFn: () => moviesApi.fetch(searchId),
  });
