import React from "react";

import { Typography } from "neetoui";

const FavouriteItem = ({ item }) => {
  console.log(item);

  return (
    <div
      className="md:h-18 flex h-14 w-3/5 items-center justify-between rounded-md border border-l-4 border-gray-200 px-5"
      key={item.imdbID}
    >
      <Typography style="h6">{item.Title}</Typography>
      <Typography style="h6">Rating: {item.imdbRating}/10</Typography>
    </div>
  );
};

export default FavouriteItem;
