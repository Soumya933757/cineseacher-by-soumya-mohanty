import React, { useEffect, useRef, useState } from "react";

import PageLoader from "components/commons/PageLoader";
import { useShowMovies } from "hooks/reactQuery/moviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";
import MovieCard from "./MovieCard";

const HomePage = () => {
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);

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

  const { data: movies = {}, isFetching } = useShowMovies(
    debouncedSearch,
    page
  );
  console.log("Movies data:", movies);

  return (
    <div className="flex h-full w-9/12 flex-col items-center justify-between p-10">
      <div className="w-full">
        <Input
          placeholder="Input search text"
          prefix={<Search />}
          ref={inputRef}
          type="search"
          value={searchKey}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="mt-10 h-full w-full">
        {isFetching ? (
          <PageLoader />
        ) : (
          <div className="h-full w-full">
            {movies?.Search?.length > 0 ? (
              <div className="flex h-full w-full flex-col justify-between gap-4">
                <div className="grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
                  {movies.Search.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                  ))}
                </div>
                <div className="self-end">
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

export default HomePage;
