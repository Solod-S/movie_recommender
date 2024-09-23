import React, { useReducer, createContext } from "react";
import { useDefaultContext } from "./defaultContext";
import { saveToStorage } from "../../utils/localStorage";
import { STORAGE_LOCALE_KEY } from "../../constants/index";

const AppContext = createContext();

let reducer = (state, action) => {
  switch (action.type) {
    case "setLocale":
      saveToStorage(STORAGE_LOCALE_KEY, action.locale);

      return { ...state, locale: action.locale };

    default:
      return state;
  }
};

const AppContextProvider = ({ children }) => {
  const defaultContext = useDefaultContext();
  const [state, dispatch] = useReducer(reducer, defaultContext);
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
