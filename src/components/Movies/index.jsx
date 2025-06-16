import React, { useEffect, useRef, useState } from "react";

import PageLoader from "components/commons/PageLoader";
import { useShowMovies } from "hooks/reactQuery/moviesApi";
import useDebounce from "hooks/useDebounce";
import { Filter, Search } from "neetoicons";
import { Input, Pagination, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";
import MovieCard from "./MovieCard";
import MovieFilter from "./MovieFilter";

const Movies = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchKey, setSearchKey] = useState(queryParams.get("search") || "");
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
  const [filterData, setFilterData] = useState({
    year: "",
    movie: true,
    series: true,
  });
  const [isDropdown, setIsDropdown] = useState(false);

  const { t } = useTranslation();

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = e => {
    setSearchKey(e.target.value);
    setPage(1);
  };

  const handlePageChange = page => {
    setPage(page);
  };

  const debouncedSearch = useDebounce(searchKey);
  const debouncedFilterData = useDebounce(filterData);

  const { data: movies = {}, isFetching } = useShowMovies(
    debouncedSearch,
    page,
    debouncedFilterData
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch);
      params.set("page", page);
    }
    history.replace({ search: params.toString() });
  }, [debouncedSearch, page, history]);

  useEffect(() => {
    if (
      movies &&
      (movies.Error === "Movie not found!" ||
        movies.Error === "Too many results.")
    ) {
      Toastr.error(movies.Error, { autoClose: 2000, position: "bottom-left" });
    }
  }, [movies]);

  return (
    <div className="homepage flex w-full flex-col items-center justify-between p-10 pt-16 md:h-screen md:w-9/12">
      <div className="relative flex w-full items-center gap-3">
        <Input
          placeholder={t("movie.search")}
          prefix={<Search />}
          ref={inputRef}
          type="search"
          value={searchKey}
          onChange={e => handleChange(e)}
        />
        <Filter
          className="cursor-pointer"
          onClick={() => setIsDropdown(prev => !prev)}
        />
        {isDropdown && (
          <MovieFilter
            filterData={filterData}
            setFilterData={setFilterData}
            setIsDropdown={setIsDropdown}
          />
        )}
      </div>
      <div className="mt-10 h-full w-full">
        {isFetching ? (
          <PageLoader />
        ) : (
          <div className="h-full w-full">
            {movies?.Search?.length > 0 ? (
              <div className="flex h-full w-full flex-col justify-between gap-4">
                <div className="grid  grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3 lg:grid-cols-5 ">
                  {movies.Search.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                  ))}
                </div>
                <div className="mt-4 self-center lg:self-end">
                  <Pagination
                    count={Number(movies.totalResults)}
                    navigate={page => handlePageChange(page)}
                    pageNo={page || DEFAULT_PAGE}
                    pageSize={DEFAULT_PAGE_SIZE}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                No movies found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
