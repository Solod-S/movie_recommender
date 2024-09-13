import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Divider, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import { MOVIE_DETAIL_BY_ID_QUERY } from "./queries";

const style = {
  position: "absolute",
  borderRadius: "15px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const contentStyle = {
  display: "flex",
  flexDirection: "row",
};

const imageStyle = {
  width: "40%", // Ширина для блока изображения
  marginRight: "20px",
  borderRadius: "10px",
};

const textContentStyle = {
  width: "60%", // Ширина для блока с текстом
};

const MovieDetailModal = ({
  open = false,
  movieId = {},
  title = "",
  onClose = () => {},
}) => {
  const { loading, error, data } = useQuery(MOVIE_DETAIL_BY_ID_QUERY, {
    variables: { ids: [+movieId] },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data</Typography>;

  const movie = data?.moviesByIds[0];

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Box sx={contentStyle}>
          <Box sx={imageStyle}>
            <img
              src={movie?.image}
              alt={movie?.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>

          <Box sx={textContentStyle}>
            <Typography id="modal-title" variant="h5" component="h2">
              {movie?.title}
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              {movie?.overview}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1">
              <strong>Vote:</strong>{" "}
              {movie?.voteAverage && Number(movie?.voteAverage.toFixed(1))}
            </Typography>
            <Typography variant="body1">
              <strong>Popularity:</strong> {movie?.popularity}
            </Typography>
            <Typography variant="body1">
              <strong>Release Date:</strong> {movie?.releaseDate}
            </Typography>
            <Typography variant="body1">
              <strong>Original Title:</strong> {movie?.originalTitle}
            </Typography>
            <Typography variant="body1">
              <strong>Genre:</strong>{" "}
              {movie?.genres?.length > 0 &&
                movie.genres.map(({ name }, index) =>
                  index + 1 < movie.genres.length ? `${name}, ` : name
                )}
            </Typography>

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Add to Selected
            </Button>
            {/* <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }}>
              Add to Favorite
            </Button> */}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

MovieDetailModal.propTypes = {
  open: PropTypes.bool,
  movieId: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default MovieDetailModal;
