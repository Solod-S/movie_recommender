const movies = async (parent, args) => {
  return {
    page: 1,
    totalResults: 12,
    totalPages: 12,
    results: [
      {
        id: 1,
        title: "title",
        releaseDate: "22.22.22",
        posterPath: "poster.jpg",
        genres: [],
      },
    ],
  };
};

module.exports = { movies };
