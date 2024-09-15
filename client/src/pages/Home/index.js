import * as React from "react";
import { motion } from "framer-motion";
import { Box, Grid, Paper } from "@mui/material";
import {
  MovieCard,
  SelectedMoviesSection,
  Filters,
  Paginator,
  MovieDetailModal,
} from "../../components";

import { useQuery } from "@apollo/client";
import { MOVIES_QUERY } from "./queries";

import { useMovies } from "../../hooks/useMovies";
import { useCustomNotification } from "../../hooks/useCustomNotification";
import { SELECTED_MOVIES_LIMIT } from "../../config";
import renderSkeletons from "../../utils/renderSkeletons";

import { useFilters } from "../../hooks/useFilters";
import { framerListVariants } from "../../constants";

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
  const { filter, setPage, setFilter } = useFilters();
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();
  const [movieId, setMovieId] = React.useState("");
  const [movieDetails, setMovieDetails] = React.useState({});
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

  const paginationHandler = (event, page) => {
    setPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
          "The movie has been successfully removed from the list.",
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
    console.log("Selected Filters:", values);
  };

  const onCloseConfirmModal = () => {
    setMovieId("");
    setMovieDetails({});
  };

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <MovieDetailModal
        title={movieId}
        movieId={movieId}
        movieDetails={movieDetails}
        open={!!movieId}
        onClose={onCloseConfirmModal}
        selectedMovies={selectedMovies}
        selectMovie={selectMovieHandler}
        deleteMovie={deleteMovieHandler}
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
              {data && (
                <Grid container spacing={2}>
                  {data.movies.results.map((movie, index) => (
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
                          setMovieDetails={setMovieDetails}
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
