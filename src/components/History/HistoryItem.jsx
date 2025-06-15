import React, { useEffect, useRef } from "react";

import { Delete } from "neetoicons";
import useHistoryItemStore from "stores/useHistoryItemStore";

const HistoryItem = ({ item }) => {
  const { active, removeHistoryItem, setItemActive } = useHistoryItemStore();
  const itemRef = useRef(0);

  const handleDelete = () => {
    removeHistoryItem(item.imdbID);
    setItemActive();
  };

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [active.imdbID]);

  return (
    <div
      ref={item.imdbID === active.imdbID ? itemRef : null}
      className={`${
        item.imdbID === active.imdbID ? "recent" : "old"
      } flex w-full items-center justify-between rounded-md px-2 py-1 `}
    >
      <div>{item.Title}</div>
      <button onClick={handleDelete}>
        <Delete size="15" />
      </button>
    </div>
  );
};

export default HistoryItem;
