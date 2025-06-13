import React from "react";

const MovieCard = ({ movie }) => (
  <div className="flex flex-col items-center justify-evenly gap-1 rounded-md bg-white px-4 py-2 shadow-lg">
    <img
      alt={movie.Title}
      className="h-44 w-32"
      src={movie.Poster}
      onError={e => {
        e.target.onerror = null;
        e.target.src =
          "https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_tronares_poster_d00cd8d6.jpeg";
      }}
    />
    <h2 className="text-md mt-2 self-start font-bold">
      {movie.Title.length >= 20
        ? `${movie.Title.slice(0, 20)}...`
        : movie.Title}
    </h2>
    <p className="self-start text-gray-600">
      {movie?.Type === "movie" ? "Movie" : "Series"} • {movie?.Year}
    </p>
    <button className="mt-2 rounded-md bg-gray-100 px-4 py-2 font-semibold text-blue-600 hover:bg-gray-300">
      View details
    </button>
  </div>
);

export default MovieCard;
