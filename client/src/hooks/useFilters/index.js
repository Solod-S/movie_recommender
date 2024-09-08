import { useCallback, useState } from "react";
import { SORT_DIRECTION } from "../../constants";

export const useFilters = () => {
  const [filter, setFilterFields] = useState({
    page: 1,
    sortBy: "popularity",
    sortDirection: SORT_DIRECTION.DESC,
    search: "",
  });

  const setPage = useCallback(
    page => {
      setFilterFields({ ...filter, page });
    },
    [filter]
  );

  const setFilter = useCallback(
    filterFields => {
      setFilterFields({
        ...filter,
        ...filterFields,
        year: +filterFields.year,
        genre: filterFields.genre === "" ? NaN : filterFields.genre,
        primaryReleaseYear: +filterFields.primaryReleaseYear,
      });
    },
    [filter]
  );
  return {
    filter,
    setPage,
    setFilter,
  };
};
