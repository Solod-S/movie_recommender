require("dotenv").config();
const IMG_PATH = process.env.IMAGE_BASE_PATH;

class Cast {
  constructor(cast) {
    this.cast = cast;
    this.id = cast.id;
    this.adult = cast.adult;
    this.gender = cast.gender;
    this.knownForDepartment = cast.known_for_department;
    this.name = cast.name;
    this.originalName = cast.original_name;
    this.popularity = cast.popularity;
    this.posterPath = `${IMG_PATH}${cast.profile_path}`;
    this.castId = cast.cast_id;
    this.character = cast.character;
    this.creditId = cast.credit_id;
    this.order = cast.order;
  }
}

module.exports = { Cast };
