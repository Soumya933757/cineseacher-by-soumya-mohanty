import React from "react";

import useHistoryItemStore from "stores/useHistoryItemStore";

import HistoryItem from "./HistoryItem";

const History = () => {
  const { historyItems } = useHistoryItemStore();

  return (
    <div className="hidden h-full w-3/12 flex-col items-center justify-between p-10 sm:block md:flex">
      <div className="w-full  text-center font-bold">View History</div>
      <div className="History mt-10 flex h-full w-full flex-col items-center gap-2 overflow-y-scroll bg-white p-5">
        {historyItems.map((item, index) => (
          <HistoryItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default History;
