import { useQuery } from "@apollo/client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MOVIES_BY_IDS_QUERY } from "./queries";
import { MovieDetailModal, MovieCard, ServerError } from "../../components";
import renderSkeletons from "../../utils/renderSkeletons";
import { AppContext } from "../../providers/appContext";
import { FormattedMessage } from "react-intl";
import { useSavedMovies } from "../../hooks/useSavedMovies";
import { useCustomNotification } from "../../hooks/useCustomNotification";

const Recommendation = () => {
  const {
    savedMovies,
    addMovieToSaved,
    removeMovieFromSaved,
    savedMoviesLoading,
  } = useSavedMovies();
  const { state } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [movieId, setMovieId] = useState("");
  const [params, setParams] = useState({ title: "", ids: [] });
  const [boxMinHeight, setBoxMinHeight] = useState("100vh");
  const { showNotification, NotificationComponent } = useCustomNotification();

  const { loading, error, data } = useQuery(MOVIES_BY_IDS_QUERY, {
    variables: { ids: params.ids },
  });

  useEffect(() => {
    const ids = searchParams
      .get("ids")
      .split(",")
      .map(id => +id);
    const title = searchParams.get("title");

    setParams({ title, ids });
  }, [searchParams]);

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

  const onCloseConfirmModal = () => {
    setMovieId("");
  };

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

  if (error) {
    console.log(`error in recommendation page: ${error}`);
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
      <MovieDetailModal
        user={state.user || null}
        isPreviewMode
        title={movieId}
        movieId={movieId}
        open={!!movieId}
        onClose={onCloseConfirmModal}
        addFavoriteMovie={addFavoriteMovie}
        removeFavoriteMovie={removeFavoriteMovie}
        savedMovies={savedMovies}
        savedMoviesLoading={savedMoviesLoading}
      />
      <Typography variant="h4" gutterBottom>
        {params.title ? params.title : "Recommended Movies"}
      </Typography>
      <Grid item xs={12} md={8} sx={{ width: "100%" }}>
        <Paper sx={{ padding: 2, minHeight: "400px" }}>
          <Box sx={{ flexGrow: 1 }}>
            {loading && renderSkeletons({ favoriteMode: true })}
            {data && (
              <Grid container spacing={2}>
                {data.moviesByIds.map(movie => (
                  <Grid key={movie.id} item xs={12} md={3} lg={2}>
                    <MovieCard
                      movie={movie}
                      onCardSelect={() => console.log(`onCardSelect`)}
                      openMovieDetailsById={setMovieId}
                      isPreviewMode
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Paper>
      </Grid>
      {NotificationComponent}
    </Box>
  );
};

export default Recommendation;
