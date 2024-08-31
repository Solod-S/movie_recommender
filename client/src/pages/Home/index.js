import * as React from "react";

import { Box, Grid, Paper, Pagination, Skeleton } from "@mui/material";
import { MovieCard, SelectedMoviesSection } from "../../components";

import { useQuery } from "@apollo/client";
import { MOVIES_QUERY } from "./queries";

import { useMovies } from "../../hooks/useMovies";
import { useCustomNotification } from "../../hooks/useCustomNotification";
import { SELECTED_MOVIES_LIMIT } from "../../config";
import renderSkeletons from "../../utils/renderSkeletons";
import { AppContext } from "../../appContext";

const Home = () => {
  const [page, setPage] = React.useState(1);
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();
  const { showNotification, NotificationComponent } = useCustomNotification();
  const { state, dispatch } = React.useContext(AppContext);
  console.log(`state.locale`, state.locale);
  const { loading, error, data } = useQuery(MOVIES_QUERY, {
    variables: { page },
  });

  React.useEffect(() => {
    console.log(selectedMovies);
  }, [selectedMovies]);

  const paginationHandler = (event, page) => {
    setPage(page);
  };

  const selectMovieHandler = movie => {
    const length = selectedMovies.length;
    const isNewMovie = !selectedMovies.find(({ id }) => id === movie.id);

    switch (true) {
      case !isNewMovie:
        showNotification(
          "This movie is already on the selected movies list.",
          "error",
          5000,
          {
            vertical: "bottom",
            horizontal: "right",
          }
        );
        return;

      case length >= SELECTED_MOVIES_LIMIT:
        showNotification(
          "The limit of the list has been reached.",
          "error",
          5000,
          {
            vertical: "bottom",
            horizontal: "right",
          }
        );
        return;

      default:
        showNotification(
          "The movie has been successfully added to the list.",
          "success",
          5000,
          {
            vertical: "bottom",
            horizontal: "right",
          }
        );
        break;
    }

    selectMovie(movie);
  };

  const deleteMovieHandler = movie => {
    switch (true) {
      default:
        showNotification(
          "The movie has been successfully removed from the list.",
          "success",
          5000,
          {
            vertical: "bottom",
            horizontal: "right",
          }
        );
        break;
    }

    deleteMovie(movie);
  };

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      {NotificationComponent}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>Filter section</Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              {loading && renderSkeletons()}
              {data && (
                <Grid container spacing={2}>
                  {data.movies.results.map(movie => (
                    <Grid key={movie.id} item xs={12} md={4} lg={3}>
                      <MovieCard
                        movie={movie}
                        onCardSelect={selectMovieHandler}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
            <Box
              mt={2}
              pb={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Pagination
                count={
                  Number(data?.movies?.totalPages) > 500
                    ? 500
                    : data?.movies?.totalPages || 1
                }
                page={page}
                onChange={paginationHandler}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid key="Selected Movie" item xs={12} md={4}>
          <SelectedMoviesSection
            selectedMovies={selectedMovies}
            onCardDelete={deleteMovieHandler}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;
