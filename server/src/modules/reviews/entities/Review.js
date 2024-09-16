require("dotenv").config();
const { format } = require("date-fns");
const IMG_PATH = process.env.IMAGE_BASE_PATH;
// this.posterPath = `${IMG_PATH}${movie.poster_path}`;
// avatar_path
class Review {
  constructor(review) {
    this.review = review;
    this.author = review.author;
    this.authorDetails = {
      ...review.author_details,
      avatar_path: review.author_details.avatar_path
        ? `${IMG_PATH}${review.author_details.avatar_path}`
        : null,
    };
    this.content = review.content;
    this.createdAt = review.created_at;
    this.id = review.id;
    this.updatedAt = review.updated_at;
    this.url = review.url;
  }
}

module.exports = { Review };
