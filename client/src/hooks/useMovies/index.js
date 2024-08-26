import { useCallback, useState } from "react";
import { SELECTED_MOVIES_LIMIT } from "../../config";

export const useMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const selectMovie = useCallback(
    movie => {
      const length = selectedMovies.length;
      const isNewMovie = !selectedMovies.find(({ id }) => id === movie.id);
      if (isNewMovie && length < SELECTED_MOVIES_LIMIT) {
        setSelectedMovies([movie, ...selectedMovies]);
      } else {
        // console.log(`isNewMovie && length < ${SELECTED_MOVIES_LIMIT}`);
      }
      // setSelectedMovies([movie, ...selectedMovies]);
    },
    [selectedMovies]
  );
  const deleteMovie = useCallback(movie => {
    setSelectedMovies(prevState =>
      prevState.filter(({ id }) => id !== movie.id)
    );
  }, []);

  return {
    selectedMovies,
    selectMovie,
    deleteMovie,
  };
};
