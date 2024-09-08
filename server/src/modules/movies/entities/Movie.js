require("dotenv").config();
const { format } = require("date-fns");
const IMG_PATH = process.env.IMAGE_BASE_PATH;

class Movie {
  constructor(movie, genresList = []) {
    this.movie = movie;
    this.id = movie.id;
    this.title = movie.title;

    this.posterPath = `${IMG_PATH}${movie.poster_path}`;
    this.adult = movie.adult;
    this.backdropPath = `${IMG_PATH}${movie.backdrop_path}`;
    this.originalLanguage = movie.original_language;
    this.originalTitle = movie.original_title;
    this.overview = movie.overview;
    this.popularity = movie.popularity;
    this.video = movie.video;
    this.voteAverage = movie.vote_average;
    this.voteCount = movie.vote_count;
    this.genres =
      movie.genres && movie.genres.length > 0
        ? movie.genres.map(({ id }) => {
            const genre = genresList.find(g => g.id === id);
            return genre
              ? { id: genre.id, name: genre.name }
              : { id, name: "Unknown" };
          })
        : movie.genre_ids.map(id => {
            const genre = genresList.find(g => g.id === id);
            return genre
              ? { id: genre.id, name: genre.name }
              : { id, name: "Unknown" };
          });
  }

  releaseDate(params) {
    return params.format && this.movie.release_date
      ? format(new Date(this.movie.release_date), params.format)
      : this.movie.release_date;
  }
}

module.exports = { Movie };
