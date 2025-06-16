import React from "react";

import PageLoader from "components/commons/PageLoader";
import { useFetchMovie } from "hooks/reactQuery/moviesApi";
import { Close } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import useFavouriteItemStore from "stores/useFavouriteItemStore";

const Details = ({ searchId, setIsModalOpen }) => {
  const { favouriteItems, addFavouriteItem, removeFavouriteItem } =
    useFavouriteItemStore.pick();

  const { t } = useTranslation();

  const { data, isFetching } = useFetchMovie({ i: searchId });

  const handlefavourites = item => {
    favouriteItems.includes(item)
      ? removeFavouriteItem(item)
      : addFavouriteItem(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {isFetching ? (
        <PageLoader />
      ) : (
        <div className="card absolute flex w-5/6  flex-col justify-evenly rounded-md bg-white p-10 shadow-lg md:w-6/12">
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex w-full justify-between gap-4">
              <div className="flex items-center">
                <div className="flex items-center gap-4 text-2xl font-bold ">
                  <Typography style="h3">{data?.Title}</Typography>
                  <Button
                    className="text-2xl"
                    size="small"
                    style="text"
                    label={
                      favouriteItems?.find(ele => ele.imdbID === data.imdbID)
                        ? "★"
                        : "☆"
                    }
                    tooltipProps={{
                      content: favouriteItems?.find(
                        ele => ele.imdbID === data.imdbID
                      )
                        ? t("movie.removeFromFavourites")
                        : t("movie.addToFavourites"),
                      position: "right",
                    }}
                    onClick={() => handlefavourites(data)}
                  />
                </div>
              </div>
              <Close
                className="cross cursor-pointer rounded-sm border "
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className="flex gap-2">
              {data?.Genre?.split(",").map((genre, index) => (
                <span
                  className="rounded-sm bg-gray-300 px-1 lg:px-2"
                  key={index}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="flex w-full  justify-between ">
            <div className="w-4/12">
              <img
                alt={t("movie.alt", { title: data.Title })}
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
              <Typography className="mb-4" style="body2">
                {data.Plot}
              </Typography>
              <Typography style="body2">
                <Trans
                  components={{ span: <span className="font-semibold" /> }}
                  i18nKey="movie.director"
                  values={{
                    value:
                      data?.Director !== "N/A"
                        ? data.Director
                        : "Not Available",
                  }}
                />
              </Typography>
              <Typography style="body2">
                <Trans
                  components={{ span: <span className="font-semibold" /> }}
                  i18nKey="movie.actors"
                  values={{
                    value:
                      data?.Actors !== "N/A" ? data.Actors : "Not Available",
                  }}
                />
              </Typography>
              <Typography style="body2">
                <Trans
                  components={{ span: <span className="font-semibold" /> }}
                  i18nKey="movie.boxOffice"
                  values={{
                    value:
                      data?.BoxOffice !== "N/A"
                        ? data.BoxOffice
                        : "Not Available",
                  }}
                />
              </Typography>
              <Typography style="body2">
                <Trans
                  components={{ span: <span className="font-semibold" /> }}
                  i18nKey="movie.runTime"
                  values={{
                    value:
                      data?.Runtime !== "N/A" ? data.Runtime : "Not Available",
                  }}
                />
              </Typography>
              <Typography style="body2">
                <Trans
                  components={{ span: <span className="font-semibold" /> }}
                  i18nKey="movie.language"
                  values={{
                    value:
                      data?.Language !== "N/A"
                        ? data.Language
                        : "Not Available",
                  }}
                />
              </Typography>
              <Typography style="body2">
                <Trans
                  components={{ span: <span className="font-semibold" /> }}
                  i18nKey="movie.rated"
                  values={{
                    value: data?.Rated !== "N/A" ? data.Rated : "Not Available",
                  }}
                />
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
