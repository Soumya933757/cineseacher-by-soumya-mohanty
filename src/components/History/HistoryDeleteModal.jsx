import React from "react";

import { Close } from "neetoicons";
import { Typography } from "neetoui";
import useHistoryItemStore from "stores/useHistoryItemStore";

const HistoryDeleteModal = ({ setIsDeleteModal }) => {
  const { clearHistory } = useHistoryItemStore();
  const handleClearAll = () => {
    clearHistory();
    setIsDeleteModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute flex h-1/5 w-1/5 flex-col rounded-md bg-white p-5 shadow-md">
        <Close
          className="cursor-pointer self-end"
          size="15"
          onClick={() => setIsDeleteModal(false)}
        />
        <Typography className="mt-3" style="h5">
          Are you sure you want to clear all items from your history? This
          action cannot be undone.
        </Typography>
        <div className="mt-5 flex items-center justify-between">
          <button
            className="rounded-md bg-red-500 px-2 py-1 text-white"
            onClick={handleClearAll}
          >
            Clear all
          </button>
          <button
            className="rounded-md bg-black px-2 py-1 text-white"
            onClick={() => setIsDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryDeleteModal;
