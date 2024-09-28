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
    const data = await getReviews(args.filter, context.locale);

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

const getSavedMovies = async (parent, args, context) => {
  try {
    if (!context.userId) {
      throw new Error("Unauthorized.");
    }

    const user = await context.prisma.user.findUnique({
      where: { id: context.userId },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const perPage = 10;
    const page = args.page || null;

    const totalResults = await context.prisma.savedMovie.count({
      where: { userId: user.id },
    });

    let movies;
    let totalPages = 1; // По умолчанию хотя бы одна страница

    if (page) {
      // Если передан аргумент page, применяем пагинацию
      const skip = (page - 1) * perPage;

      // Получаем фильмы с учетом пагинации
      movies = await context.prisma.savedMovie.findMany({
        where: { userId: user.id },
        skip,
        take: perPage,
      });

      totalPages = Math.ceil(totalResults / perPage);
    } else {
      // Если page не передан, возвращаем все фильмы без пагинации
      movies = await context.prisma.savedMovie.findMany({
        where: { userId: user.id },
      });
    }

    return {
      page: page || 1,
      totalResults,
      totalPages,
      results: movies,
    };
  } catch (error) {
    console.error(`Error in getSavedMovies resolver:`, error.message);
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
