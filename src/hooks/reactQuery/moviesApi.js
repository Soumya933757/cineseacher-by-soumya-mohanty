import { QUERY_KEYS } from "constants/query";

import { moviesApi } from "apis/movies";
import { Toastr } from "neetoui";
import { useQuery } from "react-query";

export const useShowMovies = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, params],
    queryFn: () => moviesApi.show(params),
    keepPreviousData: true,
    onSuccess: data => {
      if (
        data?.Error === "Movie not found!" ||
        data?.Error === "Too many results."
      ) {
        Toastr.error(data.Error, {
          autoClose: 2000,
          position: "bottom-left",
        });
      }
    },
  });

export const useFetchMovie = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIE, params],
    queryFn: () => moviesApi.fetch(params),
  });
