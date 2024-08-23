import { useCallback, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
export const useMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const openNotification = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const selectMovie = useCallback(
    movie => {
      const length = selectedMovies.length;
      const isNewMovie = !selectedMovies.find(({ id }) => id === movie.id);
      if (isNewMovie && length < 3) {
        setSelectedMovies([movie, ...selectedMovies]);
      } else {
        openNotification();
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
    Snackbar: (
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          This movie has already been selected.
        </Alert>
      </Snackbar>
    ),
  };
};
