const { getList } = require("../modules/genres");
const { getDetails, discoverMovie } = require("../modules/movies");
const { Movie } = require("../modules/movies/entities/Movie");

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
  console.log(`args, context`, args, context);

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

const genres = async (_, {}, { locale }) => {
  return await getList(locale);
};

module.exports = { movies, moviesByIds, genres };
