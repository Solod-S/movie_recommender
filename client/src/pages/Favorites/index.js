import { useQuery } from "@apollo/client";
import { GET_SAVED_MOVIES } from "./queries";
import { useEffect, useState } from "react";
import { MovieCard, Paginator, ServerError } from "../../components";
import { Box, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import renderSkeletons from "../../utils/renderSkeletons";
import { framerListVariants } from "../../constants";

const Favorites = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [boxMinHeight, setBoxMinHeight] = useState();
  const { loading, error, data } = useQuery(GET_SAVED_MOVIES, {
    variables: { page },
  });

  useEffect(() => {
    if (data?.getSavedMovies?.results?.length > 0) {
      console.log(
        `data?.getSavedMovies?.results`,
        data?.getSavedMovies?.results
      );
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

  if (error) {
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
      <dix style={{ height: "80%" }}></dix>

      <Grid item xs={12} md={8} sx={{ width: "100%" }}>
        <Paper sx={{ padding: 2, minHeight: "400px" }}>
          <Box sx={{ flexGrow: 1, marginBottom: "16px" }}>
            {loading && renderSkeletons()}
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
                        onCardSelect={() => console.log(`onCardSelect`)}
                        // openMovieDetailsById={setMovieId}
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
                totalPages={
                  Number(data?.getSavedMovies?.totalPages) > 500
                    ? 500
                    : data?.getSavedMovies?.totalPages || 1
                }
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
