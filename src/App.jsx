import React from "react";

import Header from "components/commons/Header";
import PageNotFound from "components/commons/PageNotFound";
import Favourite from "components/Favourite";
import HomePage from "components/HomePage";
import { Switch, Route } from "react-router-dom";
import routes from "routes";

import "./App.css";

const App = () => (
  <div className="flex w-screen flex-col">
    <Header />
    <Switch>
      <Route exact component={HomePage} path={routes.home} />
      <Route exact component={Favourite} path={routes.favourites} />
      <Route component={PageNotFound} path={routes.pageNotFound} />
    </Switch>
  </div>
);

export default App;
