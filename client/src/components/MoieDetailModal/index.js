import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Divider, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import { MOVIE_DETAIL_BY_ID_QUERY } from "./queries";
import axios from "axios"; // Добавляем axios для запросов к TMDb API

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

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

const videoStyle = {
  width: "100%",
  height: "315px",
  marginTop: "20px",
  borderRadius: "10px",
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

  const [trailerUrl, setTrailerUrl] = React.useState(null);

  React.useEffect(() => {
    if (movieId) {
      const fetchTrailer = async () => {
        try {
          // Запрос к TMDb API для получения трейлеров
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
          );
          console.log(`response`, response);
          const videos = response.data.results;
          const trailer = videos.find(
            video => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      };

      fetchTrailer();
    }
  }, [movieId]);

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
            <Divider sx={{ my: 1 }} />
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
            <Divider sx={{ my: 1 }} />
          </Box>

          <Box sx={textContentStyle}>
            <Typography id="modal-title" variant="h5" component="h2">
              {movie?.title}
            </Typography>
            {trailerUrl && (
              <Box sx={videoStyle}>
                <iframe
                  width="100%"
                  height="100%"
                  src={trailerUrl}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            )}

            <Typography variant="body1" sx={{ mt: 2 }}>
              {movie?.overview}
            </Typography>

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Add to Selected
            </Button>
            <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }}>
              Add to Favorite
            </Button>
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
