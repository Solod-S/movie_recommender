import { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_SAVED_MOVIES } from "./queries";
import { Box, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  MovieCard,
  MovieDetailModal,
  Paginator,
  ServerError,
} from "../../components";
import renderSkeletons from "../../utils/renderSkeletons";
import { framerListVariants } from "../../constants";
import { AppContext } from "../../providers/appContext";
import { useMovies } from "../../hooks/useMovies";
import { useCustomNotification } from "../../hooks/useCustomNotification";
import { SELECTED_MOVIES_LIMIT } from "../../config";
import { useSavedMovies } from "../../hooks/useSavedMovies";
import { FormattedMessage } from "react-intl";

const Favorites = () => {
  const { state } = useContext(AppContext);
  const [movieId, setMovieId] = useState("");
  const [movieCardIsLoading, setMovieCardIsLoading] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [boxMinHeight, setBoxMinHeight] = useState();
  const [totalPages, setTotalPages] = useState(1);

  const { showNotification, NotificationComponent } = useCustomNotification();
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();
  const {
    savedMovies,
    removeMovieFromSaved,
    addMovieToSaved,
    savedMoviesLoading,
  } = useSavedMovies();

  const { loading, error, data, refetch } = useQuery(GET_SAVED_MOVIES, {
    variables: { page },
  });

  useEffect(() => {
    if (data?.getSavedMovies?.results?.length > 0) {
      setTotalPages(data?.getSavedMovies?.totalPages || 1);

      setMoviesList(prevState => {
        return data.getSavedMovies.results.map(newMovie => {
          const oldMovie = prevState.find(movie => movie.id === newMovie.id);
          return {
            ...newMovie,
            image: oldMovie ? oldMovie.image : newMovie.image,
          };
        });
      });
    } else setMoviesList([]);
  }, [data]);

  useEffect(() => {
    // Dynamically find the header and calculate its height
    const headerElement = document.querySelector("header");
    const footerElement = document.querySelector("footer");

    if (headerElement) {
      const headerHeight = headerElement.offsetHeight;
      const footerHeight = footerElement.offsetHeight;
      setBoxMinHeight(`calc(100vh - ${headerHeight + footerHeight}px)`);
    }
  }, []);

  const paginationHandler = (event, page) => {
    setPage(page);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const onCloseConfirmModal = () => {
    setMovieId("");
  };
  const selectMovieHandler = movie => {
    const length = selectedMovies.length;
    const isNewMovie = !selectedMovies.find(({ id }) => id === movie.id);

    switch (true) {
      case !isNewMovie:
        showNotification(
          <FormattedMessage id="notification.movie_already_selected" />,
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
          <FormattedMessage id="notification.list_limit_reached" />,
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
          <FormattedMessage id="notification.movie_added_successfully" />,
          "success",
          1000,
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
          <FormattedMessage id="notification.movie_removed_successfully" />,
          "success",
          1000,
          {
            vertical: "bottom",
            horizontal: "right",
          }
        );
        break;
    }

    deleteMovie(movie);
  };

  const removeFavoriteMovie = async movie => {
    const moviesLength = savedMovies.length - 1;
    const result = await removeMovieFromSaved(movie);

    if (!result) {
      showNotification("Error in removing movie", "error", 5000, {
        vertical: "bottom",
        horizontal: "right",
      });
    } else {
      if (moviesLength % 12 === 0 && page > 1) {
        setPage(prevPage => prevPage - 1);
      }
      setTimeout(() => {
        refetch();
      }, 100);

      showNotification(
        <FormattedMessage id="notification.movie_removed_successfully" />,
        "success",
        1000,
        {
          vertical: "bottom",
          horizontal: "right",
        }
      );
    }
  };

  const addFavoriteMovie = async movie => {
    const result = await addMovieToSaved(movie);

    if (!result) {
      showNotification("Error in saving movie", "error", 5000, {
        vertical: "bottom",
        horizontal: "right",
      });
    } else {
      refetch();
      showNotification(
        <FormattedMessage id="notification.movie_add_to_favorite_successfully" />,
        "success",
        1000,
        {
          vertical: "bottom",
          horizontal: "right",
        }
      );
    }
  };

  if (error) {
    console.log(`error in favorite page: ${error}`);
    return <ServerError />;
  }

  return (
    <Box
      sx={{
        minHeight: boxMinHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      {NotificationComponent}
      <MovieDetailModal
        user={state.user || null}
        title={movieId}
        movieId={movieId}
        setMovieCardIsLoading={setMovieCardIsLoading}
        open={!!movieId}
        onClose={onCloseConfirmModal}
        selectedMovies={selectedMovies}
        selectMovie={selectMovieHandler}
        deleteMovie={deleteMovieHandler}
        removeFavoriteMovie={removeFavoriteMovie}
        addFavoriteMovie={addFavoriteMovie}
        savedMovies={savedMovies}
        savedMoviesLoading={savedMoviesLoading}
      />

      <Grid item xs={12} md={8} sx={{ width: "100%" }}>
        <Paper sx={{ padding: 2, minHeight: "55vh" }}>
          <Box sx={{ flexGrow: 1, marginBottom: "16px" }}>
            {loading && renderSkeletons({ favoriteMode: true })}
            {moviesList && (
              <Grid container spacing={2}>
                {moviesList.map((movie, index) => (
                  <Grid key={movie.id} item xs={12} md={3} lg={2}>
                    <motion.div
                      className="portfolio__item"
                      variants={framerListVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <MovieCard
                        movie={movie}
                        movieCardIsLoading={movieCardIsLoading}
                        openMovieDetailsById={setMovieId}
                        selected={selectedMovies.find(
                          ({ id }) => id === movie.id
                        )}
                        favorites={savedMovies.find(
                          ({ id, movieId }) => movie.id === movieId
                        )}
                        isPreviewMode
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
          {moviesList.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Paginator
                totalPages={totalPages}
                page={page}
                paginationHandler={paginationHandler}
              />
            </Box>
          )}
        </Paper>
      </Grid>
    </Box>
  );
};

export default Favorites;
