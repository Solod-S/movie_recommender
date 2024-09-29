import * as React from "react";
import { motion } from "framer-motion";
import { Box, Grid, Paper } from "@mui/material";
import {
  MovieCard,
  SelectedMoviesSection,
  Filters,
  Paginator,
  MovieDetailModal,
  ServerError,
} from "../../components";

import { useQuery } from "@apollo/client";
import { MOVIES_QUERY } from "./queries";

import { useMovies } from "../../hooks/useMovies";
import { useCustomNotification } from "../../hooks/useCustomNotification";
import { SELECTED_MOVIES_LIMIT } from "../../config";
import renderSkeletons from "../../utils/renderSkeletons";

import { useFilters } from "../../hooks/useFilters";
import { framerListVariants } from "../../constants";
import { FormattedMessage } from "react-intl";
import { AppContext } from "../../providers/appContext";
import { useSavedMovies } from "../../hooks/useSavedMovies";

const genres = [
  // {
  //   id: null,
  //   name: "All Genres",
  // },
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const startYear = 1900;
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => currentYear - i
);

const Home = () => {
  const {
    savedMovies,
    addMovieToSaved,
    removeMovieFromSaved,
    savedMoviesLoading,
  } = useSavedMovies();

  const { state } = React.useContext(AppContext);
  const { filter, setPage, setFilter } = useFilters();
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();
  const [movieId, setMovieId] = React.useState("");

  const [moviesList, setmoviesList] = React.useState([]);
  const { showNotification, NotificationComponent } = useCustomNotification();
  const { loading, error, data } = useQuery(MOVIES_QUERY, {
    variables: {
      filter: {
        page: filter.page,
        sortBy: filter.sortBy,
        sortDirection: filter.sortDirection,
        year: filter.year,
        genre: filter.genre,
        search: filter.search,
      },
    },
  });

  React.useEffect(() => {
    if (data?.movies?.results.length > 0)
      setmoviesList(prevState => {
        return data.movies.results.map(newMovie => {
          const oldMovie = prevState.find(movie => movie.id === newMovie.id);

          return {
            ...newMovie,
            image: oldMovie ? oldMovie.image : newMovie.image,
          };
        });
      });
    else setmoviesList([]);
  }, [data]);

  const addFavoriteMovie = async movie => {
    const result = await addMovieToSaved(movie);

    if (!result) {
      showNotification("Error in saving movie", "error", 5000, {
        vertical: "bottom",
        horizontal: "right",
      });
    } else {
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

  const removeFavoriteMovie = async movie => {
    const result = await removeMovieFromSaved(movie);
    if (!result) {
      showNotification("Error in removing movie", "error", 5000, {
        vertical: "bottom",
        horizontal: "right",
      });
    } else {
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

  const paginationHandler = (event, page) => {
    setPage(page);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
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

  const handleFilterSubmit = values => {
    setFilter(values);
  };

  const onCloseConfirmModal = () => {
    setMovieId("");
  };

  if (error) {
    return <ServerError />;
    // return `Error: ${error.message}`;
  }
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <MovieDetailModal
        user={state.user || null}
        title={movieId}
        movieId={movieId}
        open={!!movieId}
        onClose={onCloseConfirmModal}
        selectedMovies={selectedMovies}
        selectMovie={selectMovieHandler}
        deleteMovie={deleteMovieHandler}
        addFavoriteMovie={addFavoriteMovie}
        removeFavoriteMovie={removeFavoriteMovie}
        savedMovies={savedMovies}
        savedMoviesLoading={savedMoviesLoading}
      />

      {NotificationComponent}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Filters
            initialValues={filter}
            onSubmit={handleFilterSubmit}
            genres={genres}
            years={years}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              {loading && renderSkeletons()}
              {moviesList && moviesList.length > 0 && (
                <Grid container spacing={2}>
                  {moviesList.map((movie, index) => (
                    <Grid key={movie.id} item xs={12} md={4} lg={3}>
                      <motion.div
                        className="portfolio__item"
                        variants={framerListVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                      >
                        <MovieCard
                          movie={movie}
                          onCardSelect={selectMovieHandler}
                          openMovieDetailsById={setMovieId}
                          selected={selectedMovies.find(
                            ({ id }) => id === movie.id
                          )}
                          favorites={savedMovies.find(
                            ({ id, movieId }) =>
                              id === movie.id || movie.id === movieId
                          )}
                        />
                      </motion.div>
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
              <Paginator
                totalPages={
                  Number(data?.movies?.totalPages) > 500
                    ? 500
                    : data?.movies?.totalPages || 1
                }
                page={filter.page}
                paginationHandler={paginationHandler}
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
