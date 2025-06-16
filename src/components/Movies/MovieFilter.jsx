import React from "react";

import { Close } from "neetoicons";
import { Checkbox, Input, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const MovieFilter = ({ filterData, setFilterData, setIsDropdown }) => {
  const { t } = useTranslation();
  const handleChange = event => {
    const { name, type, checked, value } = event.target;
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
        <Input
          label={t("movie.year")}
          name="year"
          type="number"
          value={filterData.year}
          onChange={event => handleChange(event)}
        />
      </div>
      <div className="mt-5 flex w-full flex-col gap-2">
        <Typography className="mb-1">{t("movie.type")}</Typography>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={filterData.movie}
              label={t("movie.movie")}
              name="movie"
              type="checkbox"
              onChange={event => handleChange(event)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={filterData.series}
              label={t("movie.series")}
              name="series"
              type="checkbox"
              onChange={event => handleChange(event)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;
