import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Paper, Pagination, Skeleton } from "@mui/material";
import { MovieCard, MovieCardSelected } from "../../components";
import { movies } from "../../stories/stub";
import { useQuery } from "@apollo/client";
import { MOVIES_QUERY } from "./queries";

import { useMovies } from "../../hooks/useMovies";

const SelectedMoives = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
  // height: "calc(100vh - 140px)",
  minHeight: "calc(100vh - 140px)",
  position: "sticky",
  top: theme.spacing(2),
}));

const renderSkeletons = () => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(8)).map((_, index) => (
        <Grid key={index} item xs={12} md={4} lg={3}>
          <Skeleton variant="rectangular" height={431} />
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={32} />
        </Grid>
      ))}
    </Grid>
  );
};

const Home = () => {
  const [page, setPage] = React.useState(1);
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();
  const { loading, error, data } = useQuery(MOVIES_QUERY, {
    variables: { page },
  });
  React.useEffect(() => {
    console.log(selectedMovies);
  }, [selectedMovies]);
  const paginationHandler = (event, page) => {
    setPage(page);
  };
  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
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
                      <MovieCard movie={movie} onCardSelect={selectMovie} />
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
          <SelectedMoives>
            {selectedMovies.map(movie => (
              <Grid key={movie.id} item sx={{ padding: 1 }}>
                <MovieCardSelected movie={movie} onCardDelete={deleteMovie} />
              </Grid>
            ))}
          </SelectedMoives>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;
