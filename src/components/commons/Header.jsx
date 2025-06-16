import React from "react";

import { Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import routes from "routes";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="header fixed z-10 flex h-12 w-full items-center gap-10 border-b-2 border-gray-200 px-10">
      <Typography className="font-bold" style="h4">
        <Trans
          components={{ typography: <span className="text-blue-500" /> }}
          i18nKey="header.title"
        />
      </Typography>
      <div className="flex items-center gap-6">
        <NavLink exact to={routes.home}>
          {t("header.home")}
        </NavLink>
        <NavLink exact to={routes.favourites}>
          {t("header.favourites")}
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
