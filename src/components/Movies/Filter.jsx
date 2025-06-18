import React, { useState } from "react";

import { Close } from "neetoicons";
import { Checkbox, Input, Typography } from "neetoui";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { DEFAULT_PAGE } from "./constants";

const Filter = ({ filterData, setFilterData, setIsDropdown, setPage }) => {
  const [yearError, setYearError] = useState("");
  const { t } = useTranslation();

  const yearSchema = Yup.number()
    .typeError("Year must be a number")
    .min(1900, "Year must be after 1900")
    .max(2025, "Year must be before 2025")
    .nullable(true);

  const handleChange = async event => {
    const { name, type, checked, value } = event.target;

    if (equals(name, "year")) {
      try {
        await yearSchema.validate(value);
        setYearError("");
      } catch (err) {
        setYearError(err.message);
      }
    }

    setFilterData(previous => ({
      ...previous,
      [name]: equals(type, "checkbox") ? checked : value,
    }));
    setPage(DEFAULT_PAGE);
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
          label={t("movie.inputYear")}
          name="year"
          type="number"
          value={filterData.year}
          onChange={event => handleChange(event)}
        />
        {yearError && (
          <Typography className="text-red-500" style="body3">
            {yearError}
          </Typography>
        )}
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

export default Filter;
