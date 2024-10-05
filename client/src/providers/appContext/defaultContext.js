import { useSearchParams } from "react-router-dom";
import {
  STORAGE_LOCALE_KEY,
  STORAGE_USER_KEY,
  LOCALES,
} from "../../constants/index";
import { getFromStorage } from "../../utils/localStorage";

export const useDefaultContext = () => {
  const [searchParams] = useSearchParams();

  return {
    locale:
      getFromStorage(STORAGE_LOCALE_KEY) ||
      searchParams.get("locale") ||
      LOCALES.ENGLISH,
    user: getFromStorage(STORAGE_USER_KEY) || null,
  };
};
