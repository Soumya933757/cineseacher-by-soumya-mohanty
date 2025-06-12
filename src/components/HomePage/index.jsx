import React, { useState } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

const HomePage = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center p-10">
      <div className="w-full">
        <Input
          placeholder="Input search text"
          prefix={<Search />}
          type="search"
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
        />
      </div>
    </div>
  );
};

export default HomePage;
