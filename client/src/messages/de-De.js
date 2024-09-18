import { LOCALES } from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.GERMAN]: {
    navigation: {
      home: "Filme Empfehlung", // "Movies recommendation"
      settings: "Einstellungen", // "Settings"
    },
    filters: {
      search: {
        label: "Suche",
      },
      genre: {
        label: "Genre",
        allGenres: "Alle Genres",
      },
      year: {
        label: "Jahr",
        allYears: "Alle Jahre",
      },
      sortBy: {
        label: "Sortieren nach",
        popularity: "Beliebtheit",
        releaseDate: "Veröffentlichungsdatum",
        title: "Titel",
        voteAverage: "Durchschnittliche Bewertung",
        voteCount: "Anzahl der Stimmen",
      },
    },
    movie_details: {
      vote: "Abstimmung",
      release_date: "Veröffentlichungsdatum",
      original_title: "Originaltitel",
      genre: "Genre",
      cast: "Besetzung",
      reviews: "Bewertungen",
      remove_selected_btn: "Aus Auswahl entfernen",
      add_to_selected_btn: "Zur Auswahl hinzufügen",
    },
    notification: {
      movie_already_selected:
        "Dieser Film ist bereits in der Liste der ausgewählten Filme.",
      list_limit_reached: "Das Limit der Liste wurde erreicht.",
      movie_added_successfully:
        "Der Film wurde erfolgreich zur Liste hinzugefügt.",
      movie_removed_successfully:
        "Der Film wurde erfolgreich von der Liste entfernt.",
    },
    no_selected_movies: "Keine ausgewählten Filme", // "No selected movies"
    put_the_list_name: "Listenname eingeben", // "Put the list name"
    share_with_friends: "Mit Freunden teilen", // "Share with friends"
    copied: "Kopiert!", // "Copied!"
    select: "Auswählen", // "Select"
    delete: "Löschen", // "Delete"
  },
};
