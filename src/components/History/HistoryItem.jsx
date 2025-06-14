import React, { useEffect, useRef } from "react";

import useHistoryItemStore from "stores/useHistoryItemStore";

const HistoryItem = ({ item }) => {
  const { active } = useHistoryItemStore();
  const itemRef = useRef(0);

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
      } w-full rounded-md px-1 py-1 text-center `}
    >
      {item.Title}
    </div>
  );
};

export default HistoryItem;
