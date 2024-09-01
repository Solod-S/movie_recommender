import { getFromStorage } from "../../utils/localStorage";
import { STORAGE_KEY, LOCALES } from "../../constants/index";
import { useSearchParams } from "react-router-dom";

export const useDefaultContext = () => {
  const [searchParams] = useSearchParams();

  return {
    locale:
      getFromStorage(STORAGE_KEY) ||
      searchParams.get("locale") ||
      LOCALES.ENGLISH,
  };
};
