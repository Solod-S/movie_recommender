import { LOCALES } from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.FRENCH]: {
    navigation: {
      home: "Recommandation de films", // "Movies recommendation"
      settings: "Paramètres", // "Settings"
    },
    filters: {
      search: {
        label: "Recherche",
      },
      genre: {
        label: "Genre",
        allGenres: "Tous les genres",
        action: "Action",
        adventure: "Aventure",
        animation: "Animation",
        comedy: "Comédie",
        crime: "Crime",
        documentary: "Documentaire",
        drama: "Drame",
        family: "Famille",
        fantasy: "Fantastique",
        history: "Histoire",
        horror: "Horreur",
        music: "Musique",
        mystery: "Mystère",
        romance: "Romance",
        scienceFiction: "Science-fiction",
        tVMovie: "Téléfilm",
        thriller: "Thriller",
        war: "Guerre",
        western: "Western",
      },
      year: {
        label: "Année",
        allYears: "Toutes les années",
      },
      sortBy: {
        label: "Trier par",
        popularity: "Popularité",
        releaseDate: "Date de sortie",
        title: "Titre",
        voteAverage: "Moyenne des votes",
        voteCount: "Nombre de votes",
      },
    },
    no_selected_movies: "Aucun film sélectionné", // "No selected movies"
    put_the_list_name: "Entrez le nom de la liste", // "Put the list name"
    share_with_friends: "Partager avec des amis", // "Share with friends"
    copied: "Copié !", // "Copied!"
    select: "Sélectionner", // "Select"
    delete: "Supprimer", // "Delete"
  },
};
