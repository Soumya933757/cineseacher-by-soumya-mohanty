import React from "react";

import useFavouriteItemStore from "stores/useFavouriteItemStore";

import FavouriteItem from "./FavouriteItem";

const Favourite = () => {
  const { favouriteItems } = useFavouriteItemStore();

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 pt-16">
      {favouriteItems?.length > 0 ? (
        favouriteItems.map(item => (
          <FavouriteItem item={item} key={item.imdbID} />
        ))
      ) : (
        <div
          className="flex w-full items-center justify-center"
          style={{ height: "80vh" }}
        >
          No Favourites Found
        </div>
      )}
    </div>
  );
};

export default Favourite;
