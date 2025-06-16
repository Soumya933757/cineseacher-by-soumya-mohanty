import React from "react";

import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import useFavouriteItemStore from "stores/useFavouriteItemStore";

import Item from "./Item";

const Favourite = () => {
  const { t } = useTranslation();

  const { favouriteItems } = useFavouriteItemStore.pick();

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 pt-16">
      {favouriteItems?.length > 0 ? (
        favouriteItems.map(item => <Item item={item} key={item.imdbID} />)
      ) : (
        <div
          className="flex w-full items-center justify-center"
          style={{ height: "80vh" }}
        >
          <NoData title={t("favourite.noFavourites")} />
        </div>
      )}
    </div>
  );
};

export default Favourite;
