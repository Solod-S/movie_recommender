import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMenu from "../CardMenu";
import PropTypes from "prop-types";
import { Box, MenuItem, Tooltip } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { SiImdb } from "react-icons/si";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import {
  // MdFavoriteBorder,
  MdOutlineBookmarkAdded,
} from "react-icons/md";
import { styled } from "@mui/material/styles";
// import { TbSelect } from "react-icons/tb";

import DefaultPoster from "../../assets/poster.jpg";

export const MoviesRating = styled(({ movieRating, ...other }) => (
  <Box {...other} />
))`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2%;
  left: 2%;
  padding: 4px 8px;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${({ movieRating }) => {
    if (movieRating > 6) {
      return "#55ff00b0";
    }
    if (movieRating >= 4 && movieRating <= 6) {
      return "#ffcb2f70";
    }
    return "#ff00009c";
  }};
  border-radius: 8px;
  color: #000;
  font-size: 1rem;
  line-height: 1;
`;

const truncateString = (string, length = 35) => {
  if (string.length >= length) {
    return string.substring(0, length - 3) + "...";
  }
  return string;
};

const MovieCard = ({
  movie,
  onCardSelect,
  isPreviewMode = false,
  openMovieDetailsById,
  selected = false,
  favorites = false,
}) => {
  const menuRef = React.useRef();

  const callhandleClose = () => {
    if (menuRef.current) {
      menuRef.current.handleClose();
    }
  };

  const handleMovieDetails = movie => {
    openMovieDetailsById(movie.movieId || movie.id);
  };
  console.log(`movie`, movie);
  return (
    <Card
      sx={{
        position: "relative",
        transition: "transform 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
      onClick={event => {
        if (
          event.target.closest(".MuiButtonBase-root") ||
          document.querySelector(".MuiList-padding.MuiMenu-list")
        ) {
          return;
        }
        handleMovieDetails(movie);
      }}
    >
      {selected && (
        <Tooltip
          title={<span style={{ fontSize: "15px" }}>Selected</span>}
          placement="top"
          sx={{
            position: "absolute",
            bottom: 5,
            right: 5,
            zIndex: 1,
            cursor: "pointer",
          }}
        >
          <Box component="span">
            <MdOutlineBookmarkAdded color="#FF6700" size={25} />
          </Box>
        </Tooltip>
      )}
      {favorites && (
        <Tooltip
          title={<span style={{ fontSize: "15px" }}>Favorite</span>}
          placement="top"
          sx={{
            position: "absolute",
            bottom: 5,
            left: 5,
            zIndex: 1,
            cursor: "pointer",
          }}
        >
          <Box component="span">
            <MdOutlineFavoriteBorder color="#FF6700" size={25} />
          </Box>
        </Tooltip>
      )}
      {!isPreviewMode && (
        <CardMenu ref={menuRef}>
          <MenuItem
            onClick={() => {
              callhandleClose();
              setTimeout(() => {
                onCardSelect(movie);
              }, 100);
            }}
          >
            {/* <TbSelect />
            &nbsp; */}
            <FormattedMessage id="addToSelected" />
          </MenuItem>
          {/* <MenuItem
            onClick={() => {
              callhandleClose();
              setTimeout(() => {
                onCardSelect(movie);
              }, 100);
            }}
          >
            <MdFavoriteBorder />
            &nbsp;
            <FormattedMessage id="addToFavorite" />
          </MenuItem> */}
        </CardMenu>
      )}
      <MoviesRating movieRating={Math.round(movie.voteAverage || 0)}>
        <SiImdb size={25} style={{ marginRight: "4px" }} />{" "}
        <span>{Math.round(movie.voteAverage || 0)}</span>
      </MoviesRating>

      <CardMedia
        component="img"
        image={!movie.image ? DefaultPoster : movie.image}
        alt={movie.title}
        style={{ height: "431px" }}
        // onClick={() => handleMovieDetails(movie)}
      />
      <CardContent style={{ paddingBottom: "16px", height: "150px" }}>
        {movie.title.length > 35 ? (
          <Tooltip title={movie.title} arrow>
            <Typography variant="h5" gutterBottom component="div">
              {truncateString(movie.title, 35)}
            </Typography>
          </Tooltip>
        ) : (
          <Typography variant="h5" gutterBottom component="div">
            {movie.title}
          </Typography>
        )}
        <Typography variant="subtitle1" gutterBottom component="div">
          {movie.releaseDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

MovieCard.protoTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
  }).isRequired,
  onCardSelect: PropTypes.func.isRequired,
  isPreviewMode: PropTypes.bool.isRequired,
};

export default MovieCard;
