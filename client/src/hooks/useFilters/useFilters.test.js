import { render, act } from "@testing-library/react";
import React from "react"; // Убедитесь, что импортируете React
import { useFilters } from "./index"; // путь к вашему хуку
import { SORT_DIRECTION } from "../../constants";

// Компонент-обертка для использования хука
const TestComponent = ({ callback }) => {
  const { filter, setPage, setFilter } = useFilters();

  React.useEffect(() => {
    callback({ filter, setPage, setFilter });
  }, [filter, setPage, setFilter, callback]);

  return null;
};

describe("useFilters hook", () => {
  let hookValue;

  const setup = callback => {
    render(
      <TestComponent
        callback={value => {
          hookValue = value;
        }}
      />
    );
  };

  it("should initialize with default filter values", () => {
    setup();
    expect(hookValue.filter).toEqual({
      page: 1,
      sortBy: "popularity",
      sortDirection: SORT_DIRECTION.DESC,
      search: "",
    });
  });

  it("should set a new page number", () => {
    setup();

    act(() => {
      hookValue.setPage(2);
    });

    expect(hookValue.filter.page).toBe(2);
  });

  it("should update filters with new values", () => {
    setup();

    const newFilter = {
      sortBy: "release_date",
      sortDirection: SORT_DIRECTION.ASC,
      search: "action",
      genre: "drama",
      year: 2023,
    };

    act(() => {
      hookValue.setFilter(newFilter);
    });

    expect(hookValue.filter).toEqual({
      ...hookValue.filter,
      ...newFilter,
      page: 1, // Page should reset to 1 if search/genre/year changed
    });
  });

  it("should reset the page when the search, genre, or year changes", () => {
    setup();

    act(() => {
      hookValue.setPage(3);
    });

    const updatedFilter = {
      search: "new search",
      genre: "comedy",
      year: 2022,
    };

    act(() => {
      hookValue.setFilter(updatedFilter);
    });

    expect(hookValue.filter.page).toBe(1);
    expect(hookValue.filter.search).toBe("new search");
    expect(hookValue.filter.genre).toBe("comedy");
    expect(hookValue.filter.year).toBe(2022);
  });
});
