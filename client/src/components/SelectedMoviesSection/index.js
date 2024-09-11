import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  MovieCardSelected,
  SelectedMoviesForm,
  ConfirmModal,
} from "../../components";
import noMoviesImageSrc from "../../assets/no_movies.png";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { AppContext } from "../../providers/appContext";

const CLIENT_URL =
  process.env.REACT_APP_CLIENT_URL_DEV ||
  "https://react-graph-ql-omega.vercel.app/";

const SelectedMovies = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: "calc(100vh - 140px)",
  position: "sticky",
  top: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

const MoviesList = styled(Stack)(({ theme }) => ({
  overflowY: "auto", // Только вертикальная прокрутка
  height: "100%",

  // Настройка вертикальной полосы прокрутки для WebKit (Chrome, Safari)
  "::-webkit-scrollbar": {
    width: "6px", // Установить ширину полосы прокрутки
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#bfbfbf", // Цвет бегунка (можно использовать любой цвет, который не бросается в глаза)
    borderRadius: "10px", // Закругленные края
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#a6a6a6", // Цвет бегунка при наведении (чуть темнее, чтобы не бросалось в глаза)
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1", // Цвет дорожки полосы прокрутки
  },

  // Настройка вертикальной полосы прокрутки для Firefox
  scrollbarWidth: "thin", // Использовать тонкий скроллбар
  scrollbarColor: "#bfbfbf #f1f1f1", // Цвет бегунка и фона (background и track)
}));

const NoMovies = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const SelectedMoviesSection = ({ selectedMovies, onCardDelete }) => {
  const { state } = useContext(AppContext);
  const [listName, setListName] = useState("");
  const [link, setLink] = useState("");
  const ids = selectedMovies.map(({ id }) => id);

  const onSubmit = ({ listName }) => {
    const moviesLink = `${CLIENT_URL}recommend?title=${listName}&locale=${state.locale}&ids=${ids.join()}`;
    setListName(listName);
    setLink(moviesLink);
  };

  const onCloseConfirmModal = () => {
    setLink("");
  };

  if (!selectedMovies.length || selectedMovies.length <= 0) {
    return (
      <SelectedMovies>
        <NoMovies>
          <Box
            component="img"
            sx={{
              width: "50%",
              opacity: ".6",
            }}
            alt="No images."
            src={noMoviesImageSrc}
          />
          <Typography variant="h5" mt={2}>
            <FormattedMessage id="no_selected_movies" />
          </Typography>
        </NoMovies>
      </SelectedMovies>
    );
  }

  return (
    <SelectedMovies>
      <MoviesList spacing={2}>
        {selectedMovies.map(movie => (
          <Grid key={movie.id} item sx={{ padding: 1 }}>
            <MovieCardSelected movie={movie} onCardDelete={onCardDelete} />
          </Grid>
        ))}
      </MoviesList>
      <Box pt={2}>
        <SelectedMoviesForm onSubmit={onSubmit} />
      </Box>
      <ConfirmModal
        title={listName}
        url={link}
        open={!!link}
        onClose={onCloseConfirmModal}
      />
    </SelectedMovies>
  );
};

SelectedMoviesSection.propTypes = {
  selectedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string,
      genres: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
      ),
      vote_average: PropTypes.number,
    })
  ).isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default SelectedMoviesSection;
