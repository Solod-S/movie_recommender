import { Layout } from "./components";
import { Navigate, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import I18nProvider from "./providers/i18n";
import { Home, Recommendation } from "./pages";
import { useContext } from "react";
import { AppContext } from "./providers/appContext";
import { createApolloClient } from "./apolloClient";

function App() {
  const { state } = useContext(AppContext);
  const client = createApolloClient(state.locale, state?.user);

  return (
    <I18nProvider locale={state.locale}>
      <ApolloProvider client={client}>
        <Routes>
          <Route end path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="recommend" element={<Recommendation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </I18nProvider>
  );
}

export default App;
