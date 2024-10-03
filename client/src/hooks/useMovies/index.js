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
        setSelectedMovies(prevMovies => {
          const updatedMovies = [...prevMovies, movie];
          saveToStorage(SELECTED_MOVIES_KEY, updatedMovies);
          return updatedMovies;
        });
      }
    },
    [selectedMovies]
  );

  const deleteMovie = useCallback(
    movie => {
      setSelectedMovies(prevState => {
        const updatedMovies = prevState.filter(({ id }) => id !== movie.id);
        saveToStorage(SELECTED_MOVIES_KEY, updatedMovies);
        return updatedMovies;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMovies]
  );

  return {
    selectedMovies,
    selectMovie,
    deleteMovie,
  };
};
