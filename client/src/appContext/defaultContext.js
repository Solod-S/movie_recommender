import { getFromStorage } from "../utils/localStorage";
import { STORAGE_KEY, LOCALES } from "../constants/index";

export default {
  locale: getFromStorage(STORAGE_KEY) || LOCALES.ENGLISH,
};
