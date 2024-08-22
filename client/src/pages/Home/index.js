import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Paper } from "@mui/material";
import { MovieCard, MovieCardSelected } from "../../components";
import { movies } from "../../stories/stub";
import { useQuery } from "@apollo/client";
import { MOVIES_QUERY } from "./queries";

const SelectedMoives = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
  height: "calc(100vh - 140px)",
  position: "sticky",
  top: theme.spacing(2),
}));

const Home = () => {
  const { loading, error, data } = useQuery(MOVIES_QUERY);

  if (error) {
    return `Error: ${error.message}`;
  }

  const onCardSelect = movie => {
    alert("Movie added");
  };
  const onDeleteClick = movie => {
    alert("Movie was removed");
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>Filter section</Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              {loading && "Loading..."}
              {data && (
                <Grid container spacing={2}>
                  {data.movies.results.map(movie => (
                    <Grid key={movie.id} item xs={12} md={4} lg={3}>
                      <MovieCard movie={movie} onCardSelect={onCardSelect} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <SelectedMoives>
            <Grid item sx={{ padding: 1 }}>
              <MovieCardSelected
                movie={movies[0]}
                onDeleteClick={onDeleteClick}
              />
            </Grid>
            <Grid item sx={{ padding: 1 }}>
              <MovieCardSelected
                movie={movies[1]}
                onDeleteClick={onDeleteClick}
              />
            </Grid>
            <Grid item sx={{ padding: 1 }}>
              <MovieCardSelected
                movie={movies[2]}
                onDeleteClick={onDeleteClick}
              />
            </Grid>
          </SelectedMoives>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;
