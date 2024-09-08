import { useCallback, useLayoutEffect, useState } from "react";
import { SELECTED_MOVIES_LIMIT } from "../../config";
import { saveToStorage, getFromStorage } from "../../utils/localStorage";
import { SELECTED_MOVIES_KEY } from "../../constants";

export const useMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  useLayoutEffect(() => {
    const savedSelectedMovies = getFromStorage(SELECTED_MOVIES_KEY);
    if (savedSelectedMovies) {
      setSelectedMovies(savedSelectedMovies);
    }
  }, []);
  const selectMovie = useCallback(
    movie => {
      const length = selectedMovies.length;
      const isNewMovie = !selectedMovies.find(({ id }) => id === movie.id);
      if (isNewMovie && length < SELECTED_MOVIES_LIMIT) {
        setSelectedMovies([movie, ...selectedMovies]);
        saveToStorage(SELECTED_MOVIES_KEY, [movie, ...selectedMovies]);
      } else {
        // console.log(`isNewMovie && length < ${SELECTED_MOVIES_LIMIT}`);
      }
      // setSelectedMovies([movie, ...selectedMovies]);
    },
    [selectedMovies]
  );

  const deleteMovie = useCallback(
    movie => {
      saveToStorage(
        SELECTED_MOVIES_KEY,
        selectedMovies.filter(({ id }) => id !== movie.id)
      );
      setSelectedMovies(prevState =>
        prevState.filter(({ id }) => id !== movie.id)
      );
    },
    [selectedMovies]
  );

  return {
    selectedMovies,
    selectMovie,
    deleteMovie,
  };
};
