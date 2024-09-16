require("dotenv").config();

class Trailer {
  constructor(trailer) {
    this.trailer = trailer;
    this.iso_639_1 = trailer.iso_639_1;
    this.iso_3166_1 = trailer.iso_3166_1;
    this.name = trailer.name;
    this.key = trailer.key;
    this.site = trailer.site;
    this.size = trailer.size;
    this.type = trailer.type;
    this.official = trailer.official;
    this.published_at = trailer.published_at;
    this.id = trailer.id;
  }
}

module.exports = { Trailer };
