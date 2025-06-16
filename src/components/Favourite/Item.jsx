import React from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const Item = ({ item }) => {
  const { imdbID: imdbId, Title: title, imdbRating } = item;
  const { t } = useTranslation();

  return (
    <div
      className="md:h-18 flex h-14 w-3/5 items-center justify-between rounded-md border border-l-4 border-gray-200 px-5"
      key={imdbId}
    >
      <Typography style="h6">{title}</Typography>
      <Typography style="h6">
        {t("favourite.rating")}: {imdbRating}/10
      </Typography>
    </div>
  );
};

export default Item;
