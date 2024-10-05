import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";

import {
  Box,
  Typography,
  Modal,
  Divider,
  Button,
  IconButton,
  useMediaQuery,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { formatDistanceToNow } from "date-fns";

import {
  MOVIE_DETAIL_BY_ID_QUERY,
  TRAILERS_BY_ID_QUERY,
  CASTS_BY_ID_QUERY,
  REVIEWS_BY_ID_QUERY,
} from "./queries";

import DefaultPoster from "../../assets/poster.jpg";
import { FormattedMessage } from "react-intl";

const MovieDetailModal = ({
  user,
  isPreviewMode = true,
  open = false,
  selectedMovies = [],
  savedMovies = [],
  movieId,
  savedMoviesLoading,
  onClose = () => {},
  selectMovie = () => {},
  deleteMovie = () => {},
  addFavoriteMovie = () => {},
  removeFavoriteMovie = () => {},
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

  const {
    // loading: reviewLoading,
    // error,
    data: reviewsData,
    refetch,
  } = useQuery(REVIEWS_BY_ID_QUERY, {
    variables: {
      filter: {
        page: 1,
        id: +movieId,
      },
    },
    skip: !movieId || isNaN(Number(movieId)) || Number(movieId) <= 0,
  });

  useEffect(() => {
    if (movieId && !isNaN(Number(movieId)) && Number(movieId) > 0) {
      refetch(); // Выполнить запрос, если movieId валиден
    }
  }, [movieId, refetch]);

  const [trailerUrl, setTrailerUrl] = useState(null);
  const [casts, setCasts] = useState([]);
  const [reviews, setReviews] = useState([]);
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

  useEffect(() => {
    if (trailersData && trailersData?.trailersById?.length > 0) {
      const trailer = trailersData.trailersById.find(
        video => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      }
    }
    if (castsData && castsData?.creditsById?.length > 0) {
      setCasts(castsData.creditsById.slice(0, 10));
    }

    if (reviewsData && reviewsData?.reviews?.results?.length > 0) {
      setReviews(reviewsData.reviews.results.slice(0, 5));
    }

    return () => {
      setTrailerUrl(null);
      setCasts([]);
      setReviews([]);
    };
  }, [trailersData, castsData, reviewsData]);

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
                  <Fragment key={actor.id}>
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
                  </Fragment>
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

            {!isPreviewMode ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  mt: 2,
                }}
              >
                {!selectedMovies?.some(sm => sm.id === movie?.id) ? (
                  <Button
                    variant="contained"
                    disabled={!Boolean(data?.moviesByIds[0])}
                    color="primary"
                    sx={{
                      flex: user ? 0.4 : 0.8,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                    onClick={() => selectMovie(movie)}
                  >
                    <FormattedMessage id="movie_details.add_to_selected_btn" />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!Boolean(data?.moviesByIds[0])}
                    color="error"
                    sx={{
                      flex: user ? 0.4 : 0.8,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                    onClick={() => deleteMovie(movie)}
                  >
                    <FormattedMessage id="movie_details.remove_selected_btn" />
                  </Button>
                )}
                {user &&
                  (Array.isArray(savedMovies) &&
                  !savedMovies.some(sm => sm.movieId === movie?.id) ? (
                    <Button
                      variant="contained"
                      disabled={
                        !Boolean(data?.moviesByIds[0]) || savedMoviesLoading
                      }
                      color="primary"
                      sx={{
                        background: "#FFBC01",
                        flex: 0.4,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          background: "#FFBC01",
                        },
                      }}
                      onClick={() => addFavoriteMovie(movie)}
                    >
                      <FormattedMessage id="movie_details.add_to_favorite_btn" />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disabled={
                        !Boolean(data?.moviesByIds[0]) || savedMoviesLoading
                      }
                      color="error"
                      sx={{
                        background: "#B2B2B2",
                        flex: 0.4,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          background: "#B2B2B2",
                        },
                      }}
                      onClick={() => removeFavoriteMovie(movie)}
                    >
                      <FormattedMessage id="movie_details.remove_from_favorite_btn" />
                    </Button>
                  ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  mt: 2,
                }}
              >
                {user &&
                  (Array.isArray(savedMovies) &&
                  !savedMovies.some(sm => sm.movieId === movie?.id) ? (
                    <Button
                      variant="contained"
                      disabled={
                        !Boolean(data?.moviesByIds[0]) || savedMoviesLoading
                      }
                      color="primary"
                      sx={{
                        background: "#FFBC01",
                        flex: 0.4,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          background: "#FFBC01",
                        },
                      }}
                      onClick={() => addFavoriteMovie(movie)}
                    >
                      <FormattedMessage id="movie_details.add_to_favorite_btn" />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disabled={
                        !Boolean(data?.moviesByIds[0]) || savedMoviesLoading
                      }
                      color="error"
                      sx={{
                        background: "#B2B2B2",
                        flex: 0.4,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          background: "#B2B2B2",
                        },
                      }}
                      onClick={() => removeFavoriteMovie(movie)}
                    >
                      <FormattedMessage id="movie_details.remove_from_favorite_btn" />
                    </Button>
                  ))}
              </Box>
            )}
            {reviews && reviews.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: "center", marginTop: "16px" }}
                >
                  <FormattedMessage id="movie_details.reviews" />
                </Typography>
                <List
                  sx={{
                    maxHeight: "350px",
                    overflow: "auto",
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
                  }}
                >
                  {reviews.map(review => (
                    <Fragment key={review.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            src={review.authorDetails.avatar_path}
                            alt={review.authorDetails.name || review.author}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              component="div"
                              fontWeight="bold"
                            >
                              {review.authorDetails.name || review.author}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                component="div"
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: review.content,
                                  }}
                                />
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {formatDistanceToNow(
                                  new Date(review.createdAt),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Fragment>
                  ))}
                </List>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

MovieDetailModal.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.shape({
      accessToken: PropTypes.string.isRequired,
      refreshToken: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
    }),
    PropTypes.oneOf([null]), // Для указания, что значение может быть null
  ]),
  isPreviewMode: PropTypes.bool,
  savedMoviesLoading: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  movieId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  selectMovie: PropTypes.func,
  deleteMovie: PropTypes.func,
  addFavoriteMovie: PropTypes.func,
  removeFavoriteMovie: PropTypes.func,
  selectedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      voteAverage: PropTypes.number.isRequired,
      voteCount: PropTypes.number.isRequired,
    })
  ),
  savedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      movieId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      voteAverage: PropTypes.number.isRequired,
      voteCount: PropTypes.number.isRequired,
    })
  ),
};

export default MovieDetailModal;
