import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "../src/providers/appContext";
import I18nProvider from "../src/providers/i18n";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

// Конфигурация Apollo Client
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const httpLink = new HttpLink({
  uri: SERVER_URL,
  credentials: "same-origin",
});

const localMiddleware = new ApolloLink((operation, forward) => {
  const customHeaders = operation.getContext().hasOwnProperty("headers");

  operation.setContext({
    headers: { ...customHeaders, locale: "en-us" }, // Используйте нужный вам язык
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: from([localMiddleware, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <AppContextProvider>
          <I18nProvider locale="en-us">
            <ApolloProvider client={client}>
              <Story />
            </ApolloProvider>
          </I18nProvider>
        </AppContextProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
