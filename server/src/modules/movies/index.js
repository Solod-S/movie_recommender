const { themoviedbInstance } = require("../../services/axios");
const { getList } = require("../genres");
const { Movies } = require("./entities/Movies");

const getPopularMovies = async (args = {}) => {
  const { page = 1, language = "en-US" } = args;
  try {
    const response = await themoviedbInstance.get(
      `/movie/popular?language=${language}&page=${page}`
    );
    // console.log("Popular Movies:", response.data);
    const genreList = await getList(language);
    return new Movies(response.data, genreList);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    throw error;
  }
};

const getDetails = (id, language) => {
  try {
    const result = themoviedbInstance.get(`/movie/${id}?language=${language}`);
    return result;
  } catch (error) {
    console.error("Error fetching details:", error.message);
    throw error;
  }
};

const discoverMovie = async (filter, language) => {
  let url = "";
  if (filter?.search?.trim().length > 0) {
    url = `/search/movie?query=${
      filter.search
    }&include_adult=false&language=${language}&page=${filter.page || 1}`;
  } else {
    url = `/discover/movie?include_adult=false&language=${language}&page=${
      filter.page || 1
    }`;
    if (filter.year) url += `&primary_release_year=${filter.year}`;
    if (filter.genre) url += `&with_genres=${filter.genre}`;
    if (filter.sortBy && filter.sortDirection)
      url += `&sort_by=${filter.sortBy}.${filter.sortDirection}`;
  }

  try {
    const response = await themoviedbInstance.get(url);
    const genreList = await getList(language);

    const result = new Movies(response.data, genreList);

    return result;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

module.exports = { getPopularMovies, getDetails, discoverMovie };
