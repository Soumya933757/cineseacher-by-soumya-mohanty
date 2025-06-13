import { QUERY_KEYS } from "constants/query";

import { moviesApi } from "apis/movies";
import { useQuery } from "react-query";

export const useShowMovies = searchKey =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchKey],
    queryFn: () => moviesApi.show(searchKey),
  });
