export const STORAGE_LOCALE_KEY = "locale";
export const STORAGE_USER_KEY = "user";
export const SELECTED_MOVIES_KEY = "selectedMovies";
export const SORT_DIRECTION = { ASC: "asc", DESC: "desc" };
// export const SORT_OPTIONS = [
//   { label: "popularity", value: "popularity" },
//   { label: "release_date", value: "release_date" },
//   { label: "revenue", value: "revenue" },
//   { label: "primary_release_date", value: "primary_release_date" },
//   { label: "original_title", value: "original_title" },
//   { label: "vote_average", value: "vote_average" },
//   { label: "vote_count", value: "vote_count" },
// ];

export const LOCALES = {
  ENGLISH: "en-us",
  GERMAN: "de-de",
  FRENCH: "fr-ca",
};

export const framerListVariants = {
  visible: index => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.01, delay: index * 0.2 },
  }),
  hidden: { opacity: 0, y: -100 },
};

export const framerLogoVariants = {
  start: { rotate: 0, scale: 1.1 },
  end: { rotate: 5, scale: 1.2 },
  transition_img: {
    ease: "easeOut",
    duration: 8,
    repeat: Infinity,
    repeatType: "reverse",
  },
};

export const framerPosterVariants = {
  start: { rotate: 0, scale: 1 },
  end: { rotate: 1, scale: 1 },
  transition_img: {
    ease: "easeOut",
    duration: 8,
    repeat: Infinity,
    repeatType: "reverse",
  },
};
