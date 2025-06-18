import React, { useState } from "react";

import dayjs from "dayjs";
import { Button, Typography } from "neetoui";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";
import useHistoryItemStore from "stores/useHistoryItemStore";
import { convertPascalToCamelCase } from "utils/convertPascalToCamelCase";

import Details from "./Details";

const Card = ({ movie }) => {
  const { title, poster, type, year, imdbID } = convertPascalToCamelCase(movie);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const {
    addHistoryItem,
    historyItems,
    setLastSelectedItem,
    updateHistoryItem,
  } = useHistoryItemStore.pick();

  const handleClick = item => {
    setIsModalOpen(previous => !previous);
    if (!historyItems.find(element => equals(element.imdbID, item.imdbID))) {
      const newItem = { ...item, date: dayjs().valueOf() };
      addHistoryItem(newItem);
    } else {
      const prevItem = historyItems.find(element =>
        equals(element.imdbID, item.imdbID)
      );
      updateHistoryItem(prevItem);
    }
    setLastSelectedItem();
  };

  return (
    <div className="flex flex-col items-center justify-evenly gap-1 rounded-md bg-white px-4 py-3 shadow-lg">
      <img
        alt={t("movie.alt", { title })}
        className="h-44 w-32"
        src={poster}
        onError={event => {
          event.target.onerror = null;
          event.target.src =
            "https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_tronares_poster_d00cd8d6.jpeg";
        }}
      />
      <Typography className="text-md mt-2 self-start font-bold" style="h5">
        {title.length >= 20 ? `${title.slice(0, 20)}...` : title}
      </Typography>
      <Typography className="self-start text-gray-600" style="h6">
        {type === "movie" ? t("movie.movie") : t("movie.series")} • {year}
      </Typography>
      <Button
        className="mt-2 font-semibold text-blue-600"
        label={t("movie.viewDetails")}
        style="secondary"
        onClick={() => handleClick(movie)}
      />
      {isModalOpen && (
        <Details
          isModalOpen={isModalOpen}
          searchId={imdbID}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Card;
