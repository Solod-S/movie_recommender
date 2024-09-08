const { format } = require("date-fns");

class Genre {
  constructor(genre) {
    this.id = genre.id;
    this.name = genre.name;
  }
}

module.exports = {
  Genre,
};
