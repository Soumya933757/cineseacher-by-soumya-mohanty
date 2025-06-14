import React from "react";

import History from "./History";
import Movies from "./Movies";

const HomePage = () => (
  <div className="relative flex min-h-screen w-screen flex-col bg-[#f5f5f5] md:flex-row ">
    <Movies />
    <History />
  </div>
);

export default HomePage;
