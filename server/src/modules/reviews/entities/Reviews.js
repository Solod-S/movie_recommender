const { Review } = require("./Review");

class Reviews {
  constructor(movies) {
    this.page = movies.page;
    this.totalResults = movies.total_results;
    this.totalPages = movies.total_pages;
    this.results = movies.results.map(movie => new Review(movie));
  }
}

module.exports = { Reviews };
