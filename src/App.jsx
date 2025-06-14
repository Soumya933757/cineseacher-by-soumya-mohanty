import React from "react";

import Favourite from "components/Favourite";
import HomePage from "components/HomePage";
import { Switch, Route } from "react-router-dom";

import "./App.css";

const App = () => (
  <div className="w-screen">
    <Switch>
      <Route exact component={HomePage} path="/" />
      <Route exact component={Favourite} path="/favourites" />
    </Switch>
  </div>
);

export default App;
