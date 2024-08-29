import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMenu from "../CardMenu";
import PropTypes from "prop-types";
import { MenuItem, Tooltip } from "@mui/material";

const truncateString = (string, length = 35) => {
  if (string.length >= length) {
    return string.substring(0, length - 3) + "...";
  }
  return string;
};

const MovieCard = ({ movie, onCardSelect, isPreviewMode = false }) => {
  const menuRef = React.useRef();

  const callhandleClose = () => {
    if (menuRef.current) {
      menuRef.current.handleClose();
    }
  };

  return (
    <Card sx={{ position: "relative" }}>
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
            select
          </MenuItem>
        </CardMenu>
      )}
      <CardMedia
        component="img"
        image={movie.image}
        alt={movie.title}
        style={{ height: "431px" }}
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
