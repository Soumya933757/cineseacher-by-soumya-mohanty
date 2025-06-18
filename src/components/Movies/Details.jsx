import React from "react";

import PageLoader from "components/commons/PageLoader";
import { useFetchMovie } from "hooks/reactQuery/moviesApi";
import useModalSize from "hooks/useModalSize";
import { Rating, RatingFilled } from "neetoicons";
import { Button, Modal, Typography } from "neetoui";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";
import useFavouriteItemStore from "stores/useFavouriteItemStore";
import { convertPascalToCamelCase } from "utils/convertPascalToCamelCase";

import Field from "./Field";

const Details = ({ searchId, setIsModalOpen, isModalOpen }) => {
  const { favouriteItems, addFavouriteItem, removeFavouriteItem } =
    useFavouriteItemStore.pick();

  const { t } = useTranslation();

  const { data, isFetching } = useFetchMovie({ i: searchId });

  const {
    title,
    director,
    actors,
    boxOffice,
    runtime,
    language,
    rated,
    genre,
    poster,
    plot,
    imdbID,
  } = convertPascalToCamelCase(data || {});

  const movieData = [
    { key: "movie.director", value: director },
    { key: "movie.actors", value: actors },
    { key: "movie.boxOffice", value: boxOffice },
    { key: "movie.runTime", value: runtime },
    { key: "movie.language", value: language },
    { key: "movie.rated", value: rated },
  ];

  const handlefavourites = item => {
    favouriteItems.includes(item)
      ? removeFavouriteItem(item)
      : addFavouriteItem(item);
  };

  const modalSize = useModalSize();

  return (
    <>
      {isFetching ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <PageLoader />
        </div>
      ) : (
        <Modal
          closeButton
          className="card flex w-11/12 flex-col justify-evenly rounded-md bg-white p-10 shadow-lg md:w-6/12"
          closeOnOutsideClick={false}
          isOpen={isModalOpen}
          size={modalSize}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex w-full justify-between gap-4">
              <div className="flex items-center">
                <div className="flex items-center gap-1 text-2xl font-bold ">
                  <Typography style="h3">{title}</Typography>
                  <Button
                    size="small"
                    style="text"
                    label={
                      favouriteItems?.find(element =>
                        equals(element.imdbID, imdbID)
                      ) ? (
                        <RatingFilled />
                      ) : (
                        <Rating />
                      )
                    }
                    tooltipProps={{
                      content: favouriteItems?.find(element =>
                        equals(element.imdbID, imdbID)
                      )
                        ? t("movie.removeFromFavourites")
                        : t("movie.addToFavourites"),
                      position: "right",
                    }}
                    onClick={() => handlefavourites(data)}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {genre?.split(",").map((genre, index) => (
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
                alt={t("movie.alt", { title })}
                className=""
                src={poster}
                onError={event => {
                  event.target.onerror = null;
                  event.target.src =
                    "https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_tronares_poster_d00cd8d6.jpeg";
                }}
              />
            </div>
            <div className="flex w-7/12 flex-col gap-2 ">
              <Typography className="mb-4" style="body2">
                {plot}
              </Typography>
              {movieData?.map((element, index) => (
                <Field
                  data={element.value}
                  key={index}
                  translationKey={element.key}
                />
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Details;
