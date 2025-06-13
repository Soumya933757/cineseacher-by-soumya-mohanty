import React, { useState } from "react";

import PageLoader from "components/commons/PageLoader";
import { useShowMovies } from "hooks/reactQuery/moviesApi";
import { Search } from "neetoicons";
import { Input } from "neetoui";

import MovieCard from "./MovieCard";

const HomePage = () => {
  const [searchKey, setSearchKey] = useState("");

  const { data: movies = {}, isFetching } = useShowMovies(searchKey);
  console.log("Movies data:", movies);

  return (
    <div className="flex h-full w-full flex-col items-center p-10">
      <div className="w-full">
        <Input
          placeholder="Input search text"
          prefix={<Search />}
          type="search"
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
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
