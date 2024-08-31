const { getPopularMovies, getDetails } = require("../modules/movies");
const { Movie } = require("../modules/movies/entities/Movie");

const movies = async (parent, args, context) => {
  console.log(`context`, context);
  try {
    const data = await getPopularMovies({
      page: args.page,
      language: context.locale,
    });

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
  console.log(`args.ids`, args.ids);
  const language = context.locale;
  try {
    const requests = args.ids.map(id => getDetails(id, language));
    console.log(requests);

    const data = await Promise.all(requests);
    const result = data.map(mpvie => new Movie(mpvie.data));
    return result;
  } catch (error) {
    console.error(`Error in moviesByIds resolver:`, error.message);

    return [];
  }
};

module.exports = { movies, moviesByIds };
