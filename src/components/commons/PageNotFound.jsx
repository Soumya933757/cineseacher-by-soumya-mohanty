import React from "react";

import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen items-center justify-center">
      <NoData
        title={t("pageNotFound.title")}
        primaryButtonProps={{
          label: t("pageNotFound.label"),
          className: "bg-neutral-800 hover:bg-neutral-950",
          to: routes.home,
        }}
      />
    </div>
  );
};

export default PageNotFound;
