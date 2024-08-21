const { getPopularMovies } = require("../modules/movies");

const movies = async (parent, args) => {
  try {
    const data = await getPopularMovies({ page: 3, language: "en-US" });

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

module.exports = { movies };
