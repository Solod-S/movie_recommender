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
    auth: {
      login: "Connexion",
      email: "Email",
      password: "Mot de passe",
      loginBtn: "Se connecter",
      logoutBtn: "Se déconnecter",
      register: "S'inscrire",
      loginFooterMessage: "Vous n'avez pas de compte ?",
      fullName: "Nom complet",
      signUp: "S'inscrire",
      registerFooterMessage: "Vous avez déjà un compte ?",
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
      remove_from_favorite_btn: "Retirer des favoris",
      add_to_favorite_btn: "Ajouter aux favoris",
    },
    notification: {
      movie_already_selected:
        "Ce film est déjà dans la liste des films sélectionnés.",
      list_limit_reached: "La limite de la liste a été atteinte.",
      movie_added_successfully: "Le film a été ajouté avec succès à la liste.",
      movie_removed_successfully:
        "Le film a été retiré avec succès de la liste.",
      movie_add_to_favorite_successfully:
        "Le film a été ajouté avec succès à la liste des favoris.",
      movie_removed_from_favorite_successfully:
        "Le film a été retiré avec succès de la liste des favoris.",
    },
    no_selected_movies: "Aucun film sélectionné",
    put_the_list_name: "Entrez le nom de la liste",
    share_with_friends: "Partager avec des amis",
    copied: "Copié !",
    addToSelected: "Sélectionner",
    delete: "Supprimer",
    addToFavorite: "Favori",
  },
};
