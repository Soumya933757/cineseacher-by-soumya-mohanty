import { QUERY_KEYS } from "constants/query";

import { moviesApi } from "apis/movies";
import { useQuery } from "react-query";

export const useShowMovies = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, params],
    queryFn: () => moviesApi.show(params),
    keepPreviousData: true,
  });

export const useFetchMovie = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIE, params],
    queryFn: () => moviesApi.fetch(params),
  });
