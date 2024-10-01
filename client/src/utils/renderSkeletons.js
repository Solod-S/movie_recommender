import { Grid, Skeleton } from "@mui/material";

const renderSkeletons = ({ favoriteMode = false }) => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(8)).map((_, index) => (
        <Grid
          key={index}
          item
          xs={12}
          md={favoriteMode ? 3 : 4}
          lg={favoriteMode ? 2 : 3}
        >
          <Skeleton variant="rectangular" height={431} />
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={32} />
        </Grid>
      ))}
    </Grid>
  );
};

export default renderSkeletons;
