export const movies = [
  {
    id: "1",
    image:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    title: "Alien: Romulus (2024)",
    vote_average: 7.3,
    genres: [{ name: "horror", id: 1 }],
    releaseDate: "Aug 15, 2024",
  },
  {
    id: "2",
    image:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    title: "Deadpool & Wolverine (2024)",
    vote_average: 9,
    genres: [{ name: "action", id: 2 }],
    releaseDate: "Jul 25, 2024",
  },
  {
    id: "3",
    image:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    title: "Furiosa: A Mad Max Saga (2024)",
    vote_average: 8,
    genres: [{ name: "action", id: 2 }],
    releaseDate: "May 23, 2024",
  },
  {
    id: "4",
    image:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tE2vZ6HdlmKaBh0wpsvHCf7HJKo.jpg",
    title: "Watchmen: Chapter I (2024)",
    vote_average: 6,
    genres: [{ name: "action", id: 2 }],
    releaseDate: "Aug 12, 2024",
  },
];

export const initialValues = {
  page: 1,
  sortBy: "popularity",
  sortDirection: "desc",
  search: "",
};

export const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const years = [2024, 2023, 2022];
