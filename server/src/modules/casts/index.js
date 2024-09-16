const { themoviedbInstance } = require("../../services/axios");

const getCredits = async id => {
  try {
    const response = await themoviedbInstance.get(`/movie/${id}/credits`);
    const videos = response.data.cast;

    return videos;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

module.exports = {
  getCredits,
};
