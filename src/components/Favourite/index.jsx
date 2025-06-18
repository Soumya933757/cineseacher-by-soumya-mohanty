import React from "react";

import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavouriteItemStore from "stores/useFavouriteItemStore";

import Item from "./Item";

const Favourite = () => {
  const { t } = useTranslation();

  const { favouriteItems } = useFavouriteItemStore.pick();

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 pt-16">
      {!isEmpty(favouriteItems) ? (
        favouriteItems.map(item => <Item item={item} key={item.imdbID} />)
      ) : (
        <div className="favourite flex w-full items-center justify-center">
          <NoData title={t("favourite.noFavourites")} />
        </div>
      )}
    </div>
  );
};

export default Favourite;
