const axios = require("axios");
require("dotenv").config();

const TMDB_TOKEN = process.env.TMDB_TOKEN;

const themoviedbInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

module.exports = { themoviedbInstance };
