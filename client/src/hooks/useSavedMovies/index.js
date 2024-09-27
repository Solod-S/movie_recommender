import { useCallback, useContext, useLayoutEffect, useState } from "react";
import { AppContext } from "../../providers/appContext";
import { GET_SAVED_MOVIES, SAVE_MOVIE, REMOVE_MOVIE } from "./queries";
import { useMutation, useQuery } from "@apollo/client";

export const useSavedMovies = () => {
  const { state } = useContext(AppContext);
  const [saveMovie] = useMutation(SAVE_MOVIE);
  const { loading, error, data, refetch } = useQuery(GET_SAVED_MOVIES, {
    variables: { page: 1 },
    // skip: true, // Изначально пропускаем запрос
  });
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const [savedMovies, setSavedMovies] = useState([]);

  useLayoutEffect(() => {
    if (state.user) {
      // Если пользователь существует, запускаем refetch для получения данных
      refetch();
    }
  }, [state.user, refetch]);

  useLayoutEffect(() => {
    if (data && data?.getSavedMovies) {
      console.log(`savedMovies`, data.getSavedMovies.results);
      setSavedMovies(data.getSavedMovies.results); // Устанавливаем фильмы, когда есть данные
    }
  }, [data]);

  const addMovieToSaved = useCallback(
    async movie => {
      const isNewMovie = !savedMovies.find(({ id }) => id === movie.id);
      console.log(`movie`, movie);
      if (isNewMovie) {
        setSavedMovies(prevMovies => {
          const updatedMovies = [...prevMovies, movie];
          return updatedMovies;
        });

        try {
          const movieObj = {
            id: movie.id,
            title: movie.title,
            releaseDate: movie.releaseDate,
            posterPath: movie.image || "",
            genres: movie?.genres?.map(m => m.id) || [],
            adult: movie.adult || false,
            backdropPath: movie.backdropPath || "",
            originalLanguage: movie.originalLanguage || "",
            originalTitle: movie.originalTitle || "",
            overview: movie.overview || "",
            popularity: movie.popularity || 0,
            video: movie.video || false,
            voteAverage: movie.voteAverage || 0,
            voteCount: movie.voteCount || 0,
          };
          const response = await saveMovie({
            variables: {
              movie: movieObj,
            },
          });

          setSavedMovies({ ...movie, movieId: movie.id });
        } catch (error) {
          console.error("Error saving movie:", error);
        }
      }
    },
    [saveMovie, savedMovies]
  );

  const removeMovieFromSaved = useCallback(
    movie => {
      setSavedMovies(prevState => {
        const updatedMovies = prevState.filter(({ id }) => id !== movie.id);
        return updatedMovies;
      });
      removeMovie({
        variables: {
          id: "12345",
        },
      });
    },
    [removeMovie]
  );

  return {
    savedMovies,
    addMovieToSaved,
    removeMovieFromSaved,
    loading, // Вы можете использовать это для отображения состояния загрузки
    error, // Обработка ошибок
  };
};
