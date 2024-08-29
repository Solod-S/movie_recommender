import { useQuery } from "@apollo/client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MOVIES_BY_IDS_QUERY } from "./queries";
import { MovieCard } from "../../components";
import renderSkeletons from "../../utils/renderSkeletons";

const Recomendation = () => {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState({ title: "", ids: [] });
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

  if (error) return <div>Error. Try again!</div>;

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        {params.title}
      </Typography>
      <Grid item xs={12} md={8}>
        <Paper>
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            {loading && renderSkeletons()}
            {data && (
              <Grid container spacing={2}>
                {data.moviesByIds.map(movie => (
                  <Grid key={movie.id} item xs={12} md={3} lg={2}>
                    <MovieCard
                      movie={movie}
                      onCardSelect={() => console.log(`onCardSelect`)}
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
