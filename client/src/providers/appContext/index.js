import { createContext, useReducer } from "react";
import { STORAGE_LOCALE_KEY, STORAGE_USER_KEY } from "../../constants/index";
import { saveToStorage, removeFromStorage } from "../../utils/localStorage";
import { useDefaultContext } from "./defaultContext";

const AppContext = createContext();

const initialState = {
  locale: "en-us",
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLocale":
      saveToStorage(STORAGE_LOCALE_KEY, action.locale);
      return { ...state, locale: action.locale };

    case "setUser":
      saveToStorage(STORAGE_USER_KEY, action.user);
      return { ...state, user: action.user };

    case "clearUser":
      removeFromStorage(STORAGE_USER_KEY);
      return { ...state, user: null };

    default:
      return state;
  }
};

const AppContextProvider = ({ children }) => {
  const defaultContext = useDefaultContext(); // Переносим вызов в компонент
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    locale: defaultContext.locale, // Устанавливаем локаль из defaultContext
    user: defaultContext.user, // Инициализируем пользователя из defaultContext
  });

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
