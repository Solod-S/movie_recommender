const { getCredits } = require("../modules/casts");
const { getList } = require("../modules/genres");
const { getDetails, discoverMovie } = require("../modules/movies");
const { Cast } = require("../modules/casts/entities/Cast");
const { Movie } = require("../modules/movies/entities/Movie");
const { getTrailers } = require("../modules/trailers");
const { Trailer } = require("../modules/trailers/entities/Trailer");
const { getReviews } = require("../modules/reviews");
const { AuthenticationError, UserInputError } = require("apollo-server-errors");

const movies = async (parent, args, context) => {
  try {
    const data = await discoverMovie(args.filter, context.locale);
    return data;
  } catch (error) {
    console.error(`Error in movies resolver: ${error.message}`);

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
    console.error(`Error in moviesByIds resolver: ${error.message}`);
    return [];
  }
};

const trailersById = async (parent, args, context) => {
  try {
    const data = await getTrailers(args.id);
    const result = data.map(trailer => new Trailer(trailer));
    return result;
  } catch (error) {
    console.error(`Error in trailersById resolver: ${error.message}`);
    return [];
  }
};

const creditsById = async (parent, args, context) => {
  try {
    const data = await getCredits(args.id);
    const result = data.map(cast => new Cast(cast));
    return result;
  } catch (error) {
    console.error(`Error in creditsById resolver: ${error.message}`);
    return [];
  }
};

const genres = async (_, {}, { locale }) => {
  try {
    return await getList(locale);
  } catch (error) {
    console.error(`Error in genres resolver: ${error.message}`);
    return [];
  }
};

const reviews = async (parent, args, context) => {
  try {
    const data = await getReviews(args.filter, context.locale);
    return data;
  } catch (error) {
    console.error(`Error in reviews resolver: ${error.message}`);
    return {
      page: 0,
      totalResults: 0,
      totalPages: 0,
      results: [],
    };
  }
};

const getSavedMovies = async (parent, args, context) => {
  try {
    if (!context.userId) {
      throw new AuthenticationError("Unauthorized.");
    }

    const user = await context.prisma.user.findUnique({
      where: { id: context.userId },
    });

    if (!user) {
      throw new UserInputError("User not found.");
    }

    // Если передан аргумент "all: true", то возвращаем все фильмы без пагинации
    if (args.all) {
      const allMovies = await context.prisma.savedMovie.findMany({
        where: { userId: user.id },
      });

      return {
        page: 1,
        totalResults: allMovies.length,
        totalPages: 1,
        results: allMovies,
      };
    }

    const perPage = args.perPage || 10;
    const page = args.page || 1;

    const totalResults = await context.prisma.savedMovie.count({
      where: { userId: user.id },
    });

    const totalPages = Math.ceil(totalResults / perPage);
    const skip = (page - 1) * perPage;

    const movies = await context.prisma.savedMovie.findMany({
      where: { userId: user.id },
      skip,
      take: perPage,
    });

    return {
      page,
      totalResults,
      totalPages,
      results: movies,
    };
  } catch (error) {
    console.error(`Error in getSavedMovies resolver: ${error.message}`);
    return {
      page: 0,
      totalResults: 0,
      totalPages: 0,
      results: [],
    };
  }
};

module.exports = {
  movies,
  moviesByIds,
  genres,
  trailersById,
  creditsById,
  reviews,
  getSavedMovies,
};
