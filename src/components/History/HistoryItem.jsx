import React from "react";

const HistoryItem = ({ item }) => (
  <div className={`inactive w-full rounded-md px-1 py-1 text-center `}>
    {item.Title}
  </div>
);

export default HistoryItem;
