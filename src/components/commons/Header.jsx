import React from "react";

import { Typography } from "neetoui";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div className="header fixed z-10 flex h-12 w-full items-center gap-10 border-b-2 border-gray-200 px-10">
    <Typography className="font-bold" style="h4">
      <span className="text-blue-500">Cine</span> Searcher
    </Typography>
    <div className="flex items-center gap-6">
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/favourites">
        Favourites
      </NavLink>
    </div>
  </div>
);

export default Header;
