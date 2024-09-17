const { themoviedbInstance } = require("../../services/axios");
const { Reviews } = require("./entities/Reviews");

const getReviews = async ({ id, page = 1 }, language) => {
  try {
    const response = await themoviedbInstance.get(
      `/movie/${id}/reviews?language=${language}&page=${page}`
    );

    // const reviews = response.data;
    return new Reviews(response.data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

module.exports = {
  getReviews,
};
