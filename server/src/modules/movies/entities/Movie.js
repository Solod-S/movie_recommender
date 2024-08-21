require("dotenv").config();

const IMG_PATH = process.env.IMAGE_BASE_PATH;

class Movie {
  constructor(movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.releaseDate = movie.release_date;
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
  }
}
// genre_ids: [Array],
module.exports = { Movie };
