import { LOCALES } from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.GERMAN]: {
    tooltip: { generate_msg: "Klicken Sie, um einen Link zu generieren" },
    navigation: {
      home: "Filme Empfehlung",
      settings: "Einstellungen",
      homeBtn: "Startseite",
      favoriteBtn: "Favoriten",
      loginBtn: "Anmelden",
      logoutBtn: "Abmelden",
    },
    auth: {
      login: "Anmelden",
      email: "E-Mail",
      password: "Passwort",
      loginBtn: "Anmelden",
      logoutBtn: "Abmelden",
      register: "Registrieren",
      loginFooterMessage: "Noch keinen Account?",
      fullName: "Vollständiger Name",
      signUp: "Registrieren",
      registerFooterMessage: "Haben Sie schon ein Konto?",
    },
    footer: {
      privacy_policy: "Datenschutzbestimmungen",
      about_author: "Über den Autor",
      rights: "Alle Rechte vorbehalten.",
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
    no_selected_movies: "Keine ausgewählten Filme",
    put_the_list_name: "Listenname eingeben",
    share_with_friends: "Mit Freunden teilen",
    copied: "Kopiert!",
    addToSelected: "Auswählen",
    delete: "Löschen",
    addToFavorite: "Favorisieren",
  },
};
