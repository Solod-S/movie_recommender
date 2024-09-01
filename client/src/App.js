import { Box, Container, CssBaseline } from "@mui/material";
import { Navigation } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import I18nProvider from "./providers/i18n";
import { Home, Settings, Recomendation } from "./pages";
import { useContext } from "react";
import { AppContext } from "./providers/appContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const { state } = useContext(AppContext);

  const httpLink = new HttpLink({ uri: SERVER_URL });

  const localMidleware = new ApolloLink((operation, forward) => {
    const customHeaders = operation.getContext().hasOwnProperty("headers");

    operation.setContext({
      headers: { ...customHeaders, locale: state.locale },
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: from([localMidleware, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return (
    <I18nProvider locale={state.locale}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Navigation />
        <Box
          sx={{
            backgroundColor: theme => theme.palette.grey[100],
          }}
        >
          <Container maxWidth="xxl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path="recommend" element={<Recomendation />} />
            </Routes>
          </Container>
        </Box>
      </ApolloProvider>
    </I18nProvider>
  );
}

export default App;
