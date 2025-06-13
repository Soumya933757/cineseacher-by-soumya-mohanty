import React from "react";

import History from "components/History";
import HomePage from "components/HomePage";

import "./App.css";

const App = () => (
  <div className="relative flex min-h-screen w-screen flex-col bg-[#f5f5f5] md:flex-row ">
    <HomePage />
    <History />
  </div>
);

export default App;
