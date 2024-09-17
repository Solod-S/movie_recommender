import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {
  Divider,
  Button,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import {
  MOVIE_DETAIL_BY_ID_QUERY,
  TRAILERS_BY_ID_QUERY,
  CASTS_BY_ID_QUERY,
} from "./queries";
import DefaultPoster from "../../assets/poster.jpg";
import { FormattedMessage } from "react-intl";

const MovieDetailModal = ({
  isPreviewMode,
  open = false,
  movieId,

  onClose = () => {},
  selectedMovies = [],
  selectMovie = () => {},
  deleteMovie = () => {},
}) => {
  const { loading, error, data } = useQuery(MOVIE_DETAIL_BY_ID_QUERY, {
    variables: {
      ids: [+movieId],
    },
    skip: !movieId || movieId === "",
  });

  const {
    // loading: trailersLoading,
    // error: trailersError,
    data: trailersData,
  } = useQuery(TRAILERS_BY_ID_QUERY, {
    variables: {
      id: +movieId,
    },
    skip: !movieId || movieId === "",
  });

  const {
    // loading: trailersLoading,
    // error: trailersError,
    data: castsData,
  } = useQuery(CASTS_BY_ID_QUERY, {
    variables: {
      id: +movieId,
    },
    skip: !movieId || movieId === "",
  });

  const [trailerUrl, setTrailerUrl] = React.useState(null);
  const [casts, setCasts] = React.useState([]);
  const isLargeScreen = useMediaQuery("(min-width:1280px)");

  const contentStyle = {
    display: "flex",
    flexDirection: isLargeScreen ? "row" : "column",
  };

  const imageStyle = {
    width: isLargeScreen ? "40%" : "100%",
    marginRight: isLargeScreen ? "20px" : "0",
    marginBottom: isLargeScreen ? "0" : "20px",
    borderRadius: "10px",
  };

  const textContentStyle = {
    width: isLargeScreen ? "60%" : "100%",
  };

  const style = {
    position: "absolute",
    borderRadius: "15px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",

    overflowY: "auto",

    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "6px", // Для WebKit-браузеров (Chrome, Safari, Edge)
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent", // Цвет трека полосы
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888", // Цвет ползунка
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555", // Цвет ползунка при наведении
    },
  };

  if (!isLargeScreen) {
    style.minWidth = "90%";
  }

  const videoStyle = {
    width: "100%",
    height: "315px",
    marginTop: "20px",
    borderRadius: "10px",
  };

  React.useEffect(() => {
    if (trailersData && trailersData.trailersById.length > 0) {
      const trailer = trailersData.trailersById.find(
        video => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      }
    }
    if (castsData && castsData.creditsById.length > 0) {
      setCasts(castsData.creditsById.slice(0, 10));
    }
    return () => {
      setTrailerUrl(null);
      setCasts([]);
    };
  }, [trailersData, castsData]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data</Typography>;

  const movie = data?.moviesByIds[0];

  return (
    <Modal open={open} onClose={onClose} aria-label="modal-title">
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={contentStyle}>
          <Box sx={imageStyle}>
            <img
              src={!movie?.image ? DefaultPoster : movie?.image}
              alt={movie?.title}
              style={{
                width: "100%",
                borderRadius: "10px",
              }}
            />
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">
              <strong>
                <FormattedMessage id="movie_details.original_title" />:
              </strong>{" "}
              {movie?.originalTitle}
            </Typography>
            <Typography variant="body1">
              <strong>
                <FormattedMessage id="movie_details.vote" />:
              </strong>{" "}
              {movie?.voteAverage && Number(movie?.voteAverage.toFixed(1))}
            </Typography>
            <Typography variant="body1">
              <strong>
                <FormattedMessage id="movie_details.release_date" />:
              </strong>{" "}
              {movie?.releaseDate}
            </Typography>
            <Typography variant="body1">
              <strong>
                <FormattedMessage id="movie_details.genre" />:
              </strong>{" "}
              {movie?.genres?.length > 0 &&
                movie.genres.map(({ name }, index) =>
                  index + 1 < movie.genres.length ? `${name}, ` : name
                )}
            </Typography>
            {casts.length > 0 && (
              <Typography variant="body1">
                <strong>
                  <FormattedMessage
                    id="movie_details.cast"
                    defaultMessage="Cast"
                  />
                  :
                </strong>{" "}
                {casts.map((actor, index) => (
                  <React.Fragment key={actor.id}>
                    <Tooltip
                      title={
                        <img
                          src={actor.posterPath}
                          alt={actor.name}
                          style={{ width: "100px", height: "150px" }}
                        />
                      }
                      arrow
                    >
                      <span style={{ cursor: "pointer" }}>{actor.name}</span>
                    </Tooltip>
                    {index < casts.length - 1 ? ", " : "..."}
                  </React.Fragment>
                ))}
              </Typography>
            )}
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

            {!isPreviewMode && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {!selectedMovies?.some(sm => sm.id === movie?.id) ? (
                  <Button
                    variant="contained"
                    disabled={!Boolean(data?.moviesByIds[0])}
                    color="primary"
                    sx={{
                      flex: 0.8,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                    onClick={() => selectMovie(movie)}
                  >
                    Add to Selected
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!Boolean(data?.moviesByIds[0])}
                    color="error"
                    sx={{
                      flex: 0.8,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                    onClick={() => deleteMovie(movie)}
                  >
                    Remove from Selected
                  </Button>
                )}
                {/* <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
                  Add to Favorite
                </Button> */}
              </Box>
            )}
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
