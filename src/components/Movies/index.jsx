import React, { useEffect, useRef, useState } from "react";

import PageLoader from "components/commons/PageLoader";
import { useShowMovies } from "hooks/reactQuery/moviesApi";
import useDebounce from "hooks/useDebounce";
import useFocusOnSlashKey from "hooks/useFocusOnSlashKey";
import { Filter as FilterIcon, Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { equals, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import Card from "./Card";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";
import Filter from "./Filter";

const Movies = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchKey, setSearchKey] = useState(queryParams.get("search") || "");
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
  const [filterData, setFilterData] = useState({
    year: queryParams.get("year") || "",
    movie: !equals(queryParams.get("type"), "series"),
    series: !equals(queryParams.get("type"), "movie"),
  });
  const [isDropdown, setIsDropdown] = useState(false);

  const { t } = useTranslation();

  const inputRef = useRef(null);

  useFocusOnSlashKey(inputRef);

  const handleChange = event => {
    setSearchKey(event.target.value);
    setPage(1);
    setFilterData({
      year: "",
      movie: true,
      series: true,
    });
  };

  const handlePageChange = page => {
    setPage(page);
  };

  const debouncedSearch = useDebounce(searchKey);
  const debouncedFilterData = useDebounce(filterData);

  const getType = filterData => {
    if (filterData.movie && !filterData.series) return "movie";

    if (!filterData.movie && filterData.series) return "series";

    return "";
  };

  const type = getType(debouncedFilterData);

  const movieParamsData = {
    s: debouncedSearch,
    page,
    y: debouncedFilterData.year || undefined,
    type,
  };

  const { data: movies = {}, isFetching } = useShowMovies(movieParamsData);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch);
      params.set("page", page);
    }

    if (debouncedFilterData.year) {
      params.set("year", debouncedFilterData.year);
    }

    if (type) {
      params.set("type", type);
    }

    history.replace({ search: params.toString() });
  }, [debouncedSearch, page, debouncedFilterData, history]);

  return (
    <div className="homepage flex w-full flex-col items-center justify-between border-r-2 border-gray-200 p-10 pt-16 md:h-screen md:w-9/12">
      <div className="relative flex w-full items-center gap-3">
        <Input
          placeholder={t("movie.search")}
          prefix={<Search />}
          ref={inputRef}
          type="search"
          value={searchKey}
          onChange={event => handleChange(event)}
        />
        <FilterIcon
          className="cursor-pointer"
          onClick={() => setIsDropdown(prev => !prev)}
        />
        {isDropdown && (
          <Filter
            filterData={filterData}
            setFilterData={setFilterData}
            setIsDropdown={setIsDropdown}
            setPage={setPage}
          />
        )}
      </div>
      <div className="mt-10 h-full w-full">
        {isFetching ? (
          <PageLoader />
        ) : (
          <div className="h-full w-full">
            {movies?.Search && !isEmpty(movies?.Search) ? (
              <div className="flex h-full w-full flex-col justify-between gap-4">
                <div className="grid  grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3 lg:grid-cols-5 ">
                  {movies?.Search?.map((movie, index) => (
                    <Card key={index} movie={movie} />
                  ))}
                </div>
                <div className="mt-4 self-center lg:self-end">
                  <Pagination
                    count={Number(movies?.totalResults) || 0}
                    navigate={page => handlePageChange(page)}
                    pageNo={page || DEFAULT_PAGE}
                    pageSize={DEFAULT_PAGE_SIZE}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <NoData title={t("movie.searchForMovie")} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
