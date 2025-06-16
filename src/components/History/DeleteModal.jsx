import React from "react";

import { Alert } from "neetoui";
import { useTranslation } from "react-i18next";
import useHistoryItemStore from "stores/useHistoryItemStore";

const DeleteModal = ({ setIsDeleteModal, isDeleteModal, message }) => {
  const { t } = useTranslation();

  const { clearHistory } = useHistoryItemStore.pick();

  const handleClearAll = () => {
    clearHistory();
    setIsDeleteModal(false);
  };

  return (
    <Alert
      closeButton
      cancelButtonLabel={t("history.cancel")}
      isOpen={isDeleteModal}
      message={message}
      submitButtonLabel={t("history.clearAll")}
      title={t("history.clearTitle")}
      onClose={() => setIsDeleteModal(false)}
      onSubmit={handleClearAll}
    />
  );
};

export default DeleteModal;
