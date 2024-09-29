import { ApolloProvider } from "@apollo/client";
import I18nProvider from "./providers/i18n";
import { useContext } from "react";
import { AppContext } from "./providers/appContext";
import { createApolloClient } from "./apolloClient";
import UserRoutes from "./UserRoutes";

function App() {
  const { state } = useContext(AppContext);
  const client = createApolloClient(state.locale, state?.user);

  return (
    <I18nProvider locale={state.locale}>
      <ApolloProvider client={client}>
        <UserRoutes user={state.user} />
      </ApolloProvider>
    </I18nProvider>
  );
}

export default App;
