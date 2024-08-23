import { useCallback, useState } from "react";

export const useMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const selectMovie = useCallback(
    movie => {
      const length = selectedMovies.length;
      const isNewMovie = !selectedMovies.find(({ id }) => id === movie.id);
      if (isNewMovie && length < 3) {
        setSelectedMovies([movie, ...selectedMovies]);
      } else {
        console.log("isNewMovie && length < 3");
      }
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
