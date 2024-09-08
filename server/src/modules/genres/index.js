const { Genre } = require("./entities/Genre");
const { themoviedbInstance } = require("../../services/axios");

const getList = async language => {
  const response = await themoviedbInstance.get(
    `/genre/movie/list?language=${language}`
  );

  return response.data.genres.map(genre => new Genre(genre));
};

module.exports = {
  getList,
};
