import React from "react";

import PageLoader from "components/commons/PageLoader";
import { useFetchMovie } from "hooks/reactQuery/moviesApi";
import { Close } from "neetoicons";

const MovieDetails = ({ searchId, setIsModalOpen }) => {
  const { data, isFetching } = useFetchMovie(searchId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {isFetching ? (
        <PageLoader />
      ) : (
        <div className="absolute flex w-6/12 flex-col justify-evenly rounded-md bg-white p-10 shadow-lg">
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <div className="text-2xl font-bold">{data?.Title}</div>
              <Close
                className="cursor-pointer rounded-sm border"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className="flex gap-2">
              {data?.Genre?.split(",").map((genre, index) => (
                <span className="rounded-sm bg-gray-300 px-2" key={index}>
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div className="w-4/12">
              <img
                alt={data?.Title}
                className=""
                src={data?.Poster}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_tronares_poster_d00cd8d6.jpeg";
                }}
              />
            </div>
            <div className="flex w-7/12 flex-col gap-2 ">
              <div className="mb-4">{data.Plot}</div>
              <p>
                <span className="font-semibold">Director: </span>
                {data.Director}
              </p>
              <p>
                <span className="font-semibold">Actors: </span>
                {data.Actors}
              </p>
              <p>
                <span className="font-semibold">Box Office: </span>
                {data.BoxOffice}
              </p>
              <p>
                <span className="font-semibold">Year: </span>
                {data.Year}
              </p>
              <p>
                <span className="font-semibold">Runtime: </span>
                {data.Runtime}
              </p>
              <p>
                <span className="font-semibold">Language: </span>
                {data.Language}
              </p>
              <p>
                <span className="font-semibold">Rated: </span>
                {data.Rated}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
