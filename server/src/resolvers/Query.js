const { getCredits } = require("../modules/casts");
const { getList } = require("../modules/genres");
const { getDetails, discoverMovie } = require("../modules/movies");
const { Cast } = require("../modules/casts/entities/Cast");
const { Movie } = require("../modules/movies/entities/Movie");
const { getTrailers } = require("../modules/trailers");
const { Trailer } = require("../modules/trailers/entities/Trailer");
const { getReviews } = require("../modules/reviews");

const movies = async (parent, args, context) => {
  try {
    const data = await discoverMovie(args.filter, context.locale);

    return data;
  } catch (error) {
    console.error(`Error in movies resolver:`, error.message);

    return {
      page: 0,
      totalResults: 0,
      totalPages: 0,
      results: [],
    };
  }
};

const moviesByIds = async (parent, args, context) => {
  const language = context.locale;
  try {
    const requests = args.ids.map(id => getDetails(id, language));

    const data = await Promise.all(requests);

    const genreList = await getList(language);

    const result = data.map(movie => new Movie(movie.data, genreList));

    return result;
  } catch (error) {
    console.error(`Error in moviesByIds resolver:`, error.message);

    return [];
  }
};

const trailersById = async (parent, args, context) => {
  try {
    const data = await getTrailers(args.id);
    const result = data.map(trailer => new Trailer(trailer));
    return result;
  } catch (error) {
    console.error(`Error in trailers resolver:`, error.message);

    return [];
  }
};

const creditsById = async (parent, args, context) => {
  try {
    const data = await getCredits(args.id);
    const result = data.map(cast => new Cast(cast));
    return result;
  } catch (error) {
    console.error(`Error in credits resolver:`, error.message);

    return [];
  }
};

const genres = async (_, {}, { locale }) => {
  return await getList(locale);
};

const reviews = async (parent, args, context) => {
  try {
    console.log(`args`, args);
    const data = await getReviews(args.filter, context.locale);
    console.log(`data`, data);
    return data;
  } catch (error) {
    console.error(`Error in reviews resolver:`, error.message);

    return {
      page: 0,
      totalResults: 0,
      totalPages: 0,
      results: [],
    };
  }
};
// getReviews

module.exports = {
  movies,
  moviesByIds,
  genres,
  trailersById,
  creditsById,
  reviews,
};
