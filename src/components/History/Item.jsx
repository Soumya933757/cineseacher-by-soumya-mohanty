import React, { useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Alert } from "neetoui";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";
import useHistoryItemStore from "stores/useHistoryItemStore";
import { convertPascalToCamelCase } from "utils/convertPascalToCamelCase";

const Item = ({ item }) => {
  const { title, imdbID } = convertPascalToCamelCase(item);
  const [isItemDeleteModal, setIsItemDeleteModal] = useState(false);

  const { t } = useTranslation();

  const { lastSelectedItem, removeHistoryItem, setLastSelectedItem } =
    useHistoryItemStore.pick();

  const itemRef = useRef(0);

  const handleDelete = () => {
    removeHistoryItem(imdbID);
    setLastSelectedItem();
    setIsItemDeleteModal(false);
  };

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastSelectedItem.imdbID]);

  return (
    <div
      ref={equals(imdbID, lastSelectedItem.imdbID) ? itemRef : null}
      className={classNames(
        equals(imdbID, lastSelectedItem.imdbID) ? "recent" : "old",
        "flex w-full items-center justify-between rounded-md px-2 py-1"
      )}
    >
      <div>{title}</div>
      <Delete
        className="flex-shrink-0 cursor-pointer"
        size="15"
        onClick={() => setIsItemDeleteModal(true)}
      />
      <Alert
        closeButton
        cancelButtonLabel={t("history.cancel")}
        isOpen={isItemDeleteModal}
        message={t("history.deleteAlert", { title })}
        submitButtonLabel={t("history.delete")}
        title={t("history.deleteTitle")}
        onClose={() => setIsItemDeleteModal(false)}
        onSubmit={handleDelete}
      />
    </div>
  );
};

export default Item;
