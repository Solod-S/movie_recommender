import { LOCALES } from "../constants";

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
        action: "Action",
        adventure: "Abenteuer",
        animation: "Animation",
        comedy: "Komödie",
        crime: "Krimi",
        documentary: "Dokumentarfilm",
        drama: "Drama",
        family: "Familie",
        fantasy: "Fantasy",
        history: "Geschichte",
        horror: "Horror",
        music: "Musik",
        mystery: "Mystery",
        romance: "Romanze",
        scienceFiction: "Science-Fiction",
        tVMovie: "TV-Film",
        thriller: "Thriller",
        war: "Krieg",
        western: "Western",
      },
      year: {
        label: "Jahr",
        allYears: "Alle Jahre",
      },
      sortBy: {
        label: "Sortieren nach",
        default: "Standard",
        popularity: "Beliebtheit",
        releaseDate: "Veröffentlichungsdatum",
        title: "Titel",
        voteAverage: "Durchschnittliche Bewertung",
        voteCount: "Anzahl der Stimmen",
      },
    },
    no_selected_movies: "Keine ausgewählten Filme", // "No selected movies"
    put_the_list_name: "Listenname eingeben", // "Put the list name"
    share_with_friends: "Mit Freunden teilen", // "Share with friends"
    copied: "Kopiert!", // "Copied!"
    select: "Auswählen", // "Select"
    delete: "Löschen", // "Delete"
  },
};
