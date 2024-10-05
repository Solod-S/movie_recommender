import { useContext } from "react";
import { ApolloProvider } from "@apollo/client";

import { AppContext } from "./providers/appContext";
import I18nProvider from "./providers/i18n";
import { createApolloClient } from "./apolloClient";
import UserRoutes from "./UserRoutes";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const client = createApolloClient({
    locale: state.locale,
    userData: state?.user,
    dispatch,
  });

  return (
    <I18nProvider locale={state.locale}>
      <ApolloProvider client={client}>
        <UserRoutes user={state.user} />
      </ApolloProvider>
    </I18nProvider>
  );
}

export default App;
