import { LOCALES } from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.FRENCH]: {
    tooltip: { generate_msg: "Cliquez pour générer un lien" },
    navigation: {
      home: "Recommandation de films",
      settings: "Paramètres",
      homeBtn: "Accueil",
      favoriteBtn: "Favoris",
      loginBtn: "Connexion",
      logoutBtn: "Déconnexion",
    },
    footer: {
      privacy_policy: "Politique de confidentialité",
      about_author: "À propos de l'auteur",
      rights: "Tous droits réservés.",
    },
    filters: {
      search: {
        label: "Recherche",
      },
      genre: {
        label: "Genre",
        allGenres: "Tous les genres",
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
    movie_details: {
      vote: "Vote",
      release_date: "Date de sortie",
      original_title: "Titre original",
      genre: "Genre",
      cast: "Distribution",
      reviews: "Avis",
      remove_selected_btn: "Retirer de la sélection",
      add_to_selected_btn: "Ajouter à la sélection",
    },
    notification: {
      movie_already_selected:
        "Ce film est déjà dans la liste des films sélectionnés.",
      list_limit_reached: "La limite de la liste a été atteinte.",
      movie_added_successfully: "Le film a été ajouté avec succès à la liste.",
      movie_removed_successfully:
        "Le film a été retiré avec succès de la liste.",
    },
    no_selected_movies: "Aucun film sélectionné", // "No selected movies"
    put_the_list_name: "Entrez le nom de la liste", // "Put the list name"
    share_with_friends: "Partager avec des amis", // "Share with friends"
    copied: "Copié !", // "Copied!"
    select: "Sélectionner", // "Select"
    delete: "Supprimer", // "Delete"
  },
};
