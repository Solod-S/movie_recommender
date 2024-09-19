import { LOCALES } from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.ENGLISH]: {
    tooltip: { generate_msg: "Click to generate a link" },
    navigation: {
      home: "Movies recommendation",
      settings: "Settings",
      homeBtn: "Home",
      favoriteBtn: "Favorite",
      loginBtn: "Login",
    },
    footer: {
      privacy_policy: "Privacy Policy",
      about_author: "About author",
      rights: "All rights reserved.",
    },
    filters: {
      search: {
        label: "Search",
      },
      genre: {
        label: "Genre",
        allGenres: "All Genres",
      },
      year: {
        label: "Year",
        allYears: "All Years",
      },
      sortBy: {
        label: "Sort By",
        popularity: "Popularity",
        releaseDate: "Release Date",
        title: "Title",
        voteAverage: "Vote Average",
        voteCount: "Vote Count",
      },
    },
    movie_details: {
      vote: "Vote",
      release_date: "Release Date",
      original_title: "Original Title",
      genre: "Genre",
      cast: "Cast",
      reviews: "Reviews",
      remove_selected_btn: "Remove from Selected",
      add_to_selected_btn: "Add to Selected",
    },
    notification: {
      movie_already_selected:
        "This movie is already on the selected movies list.",
      list_limit_reached: "The limit of the list has been reached.",
      movie_added_successfully:
        "The movie has been successfully added to the list.",
      movie_removed_successfully:
        "The movie has been successfully removed from the list.",
    },
    no_selected_movies: "No selected movies",
    put_the_list_name: "Put the list name",
    share_with_friends: "Share with friends",
    copied: "Copied!",
    select: "Select",
    delete: "Delete",
  },
};
