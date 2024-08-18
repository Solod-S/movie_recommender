import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Paper } from "@mui/material";
import { MovieCard } from "../../components";
import { movies } from "../../stories/stub";
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
  const onCardSelect = movie => {
    alert("Movie added");
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={3}>
                  <MovieCard movie={movies[0]} onCardSelect={onCardSelect} />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <MovieCard movie={movies[1]} onCardSelect={onCardSelect} />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <MovieCard movie={movies[2]} onCardSelect={onCardSelect} />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <MovieCard movie={movies[3]} onCardSelect={onCardSelect} />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectedMoives>Selected movies</SelectedMoives>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;
