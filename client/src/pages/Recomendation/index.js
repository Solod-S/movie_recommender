import { useQuery } from "@apollo/client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MOVIES_BY_IDS_QUERY } from "./queries";
import { MoieDetailModal, MovieCard } from "../../components";
import renderSkeletons from "../../utils/renderSkeletons";

const Recomendation = () => {
  const [searchParams] = useSearchParams();
  const [movieId, setMovieId] = useState("");
  const [params, setParams] = useState({ title: "", ids: [] });
  const [boxMinHeight, setBoxMinHeight] = useState("100vh");

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
    const headerElement = document.querySelector("header"); // Adjust selector to match your actual header element
    if (headerElement) {
      const headerHeight = headerElement.offsetHeight;
      setBoxMinHeight(`calc(100vh - ${headerHeight}px)`);
    }
  }, []);

  const onCloseConfirmModal = () => {
    setMovieId("");
  };

  if (error) return <div>Error. Try again!</div>;

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
      <MoieDetailModal
        title={movieId}
        movieId={movieId}
        open={!!movieId}
        onClose={onCloseConfirmModal}
      />
      <Typography variant="h4" gutterBottom>
        {params.title ? params.title : "Recommended Movies"}
      </Typography>
      <Grid item xs={12} md={8} sx={{ width: "100%" }}>
        <Paper sx={{ padding: 2, minHeight: "400px" }}>
          <Box sx={{ flexGrow: 1 }}>
            {loading && renderSkeletons()}
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
    </Box>
  );
};

export default Recomendation;
