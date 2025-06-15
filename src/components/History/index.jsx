import React, { useState } from "react";

import { Typography } from "neetoui";
import useHistoryItemStore from "stores/useHistoryItemStore";

import HistoryDeleteModal from "./HistoryDeleteModal";
import HistoryItem from "./HistoryItem";

const History = () => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { historyItems } = useHistoryItemStore();

  return (
    <div className="hidden h-screen w-full flex-col items-center justify-between p-10 pt-16 md:flex md:w-4/12 lg:w-3/12">
      <div className="flex w-full items-center justify-between px-2 font-bold">
        <Typography style="h3" weight="bold">
          View History
        </Typography>
        <button
          className="font-semibold text-red-500"
          onClick={() => setIsDeleteModal(prev => !prev)}
        >
          Clear all
        </button>
        {isDeleteModal && (
          <HistoryDeleteModal setIsDeleteModal={setIsDeleteModal} />
        )}
      </div>
      <div className="History mt-6 flex h-full w-full flex-col items-center gap-2 overflow-y-scroll bg-white p-5">
        {historyItems.length > 0 ? (
          historyItems.map((item, index) => (
            <HistoryItem item={item} key={index} />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            Nothing to show
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
