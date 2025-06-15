import React from "react";

import { Close } from "neetoicons";

const MovieFilter = ({ filterData, setFilterData, setIsDropdown }) => {
  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setFilterData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="absolute right-0 top-14  flex flex-col items-center bg-white p-5 shadow-md md:w-2/4 lg:w-1/4">
      <Close
        className="cursor-pointer self-end rounded-sm "
        size="15"
        onClick={() => setIsDropdown(false)}
      />
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="year">Year</label>
        <input
          className="rounded-md border border-gray-200 px-2 py-1"
          name="year"
          type="number"
          value={filterData.year}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="mt-5 flex w-full flex-col gap-2">
        <label>Type</label>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              checked={filterData.movie}
              className=""
              id="movie"
              name="movie"
              type="checkbox"
              onChange={e => handleChange(e)}
            />
            <label htmlFor="movie">Movie</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              checked={filterData.series}
              id="series"
              name="series"
              type="checkbox"
              onChange={e => handleChange(e)}
            />
            <label htmlFor="series">Series</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;
