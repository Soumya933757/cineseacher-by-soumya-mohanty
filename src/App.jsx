import React from "react";

import History from "components/History";
import HomePage from "components/HomePage";

import "./App.css";

const App = () => (
  <div className="relative flex h-screen w-screen bg-[#f5f5f5] ">
    <HomePage />
    <History />
  </div>
);

export default App;
