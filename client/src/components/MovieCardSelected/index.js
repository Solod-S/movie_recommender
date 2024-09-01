import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import CardMenu from "../CardMenu";
import { MenuItem } from "@mui/material";
import { FormattedMessage } from "react-intl";

const MovieCardSelected = ({ movie, onCardDelete }) => {
  const menuRef = React.useRef();

  const callhandleClose = () => {
    if (menuRef.current) {
      menuRef.current.handleClose();
    }
  };
  return (
    <Card sx={{ display: "flex", position: "relative", minHeight: "164px" }}>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={movie.image}
        alt={movie.title}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {movie.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {movie.releaseDate}
          </Typography>
        </CardContent>
        <Box sx={{ padding: 2, paddingTop: 0 }}>
          {movie?.genres?.length > 0 ? (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {movie.genres[0].name}
            </Typography>
          ) : null}
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {movie.vote_average
              ? "User score: " + movie.vote_average
              : "User score: " + 0}
          </Typography>
        </Box>
      </Box>
      <CardMenu ref={menuRef}>
        <MenuItem
          onClick={() => {
            callhandleClose();
            setTimeout(() => {
              onCardDelete(movie);
            }, 100);
          }}
        >
          <FormattedMessage id="delete" />
        </MenuItem>
      </CardMenu>
    </Card>
  );
};

MovieCardSelected.protoTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
    ),
    vote_average: PropTypes.number,
  }).isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default MovieCardSelected;
