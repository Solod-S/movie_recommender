const { themoviedbInstance } = require("../../services/axios");

const getTrailers = async id => {
  try {
    const response = await themoviedbInstance.get(`/movie/${id}/videos`);
    const videos = response.data.results;

    return videos;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

module.exports = {
  getTrailers,
};
