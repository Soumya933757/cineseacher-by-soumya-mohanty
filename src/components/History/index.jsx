import React, { useState } from "react";

import { NoData, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useHistoryItemStore from "stores/useHistoryItemStore";

import DeleteModal from "./DeleteModal";
import Item from "./Item";

const History = () => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { t } = useTranslation();

  const { historyItems } = useHistoryItemStore.pick();

  return (
    <div className="hidden h-screen w-full flex-col items-center justify-between p-10 pt-16 md:flex md:w-4/12 lg:w-3/12">
      <div className="flex w-full items-center justify-between px-2 font-bold">
        <Typography style="h3" weight="bold">
          {t("history.viewHistory")}
        </Typography>
        <button
          className="font-semibold text-red-500"
          onClick={() => setIsDeleteModal(prev => !prev)}
        >
          {t("history.clearAll")}
        </button>
        <DeleteModal
          isDeleteModal={isDeleteModal}
          message={t("history.clearAlert")}
          setIsDeleteModal={setIsDeleteModal}
        />
      </div>
      <div className="History mt-6 flex h-full w-full flex-col items-center gap-2 overflow-y-scroll bg-white p-5">
        {historyItems.length > 0 ? (
          historyItems.map((item, index) => <Item item={item} key={index} />)
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <NoData title={t("history.nothingToShow")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
