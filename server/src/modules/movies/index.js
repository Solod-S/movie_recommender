const { themoviedbInstance } = require("../../services/axios");
const { Movies } = require("./entities/Movies");

const getPopularMovies = async (args = {}) => {
  const { page = 1, language = "en-US" } = args;
  try {
    const response = await themoviedbInstance.get(
      `/movie/popular?language=${language}&page=${page}`
    );
    // console.log("Popular Movies:", response.data);
    return new Movies(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    throw error;
  }
};

module.exports = { getPopularMovies };
