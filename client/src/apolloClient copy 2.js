import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const httpLink = new HttpLink({
  uri: SERVER_URL,
  credentials: "same-origin",
});

export const createApolloClient = ({ locale, userData, dispatch }) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        // Пример обработки ошибки авторизации
        if (message === "Context creation failed: Not authenticated") {
          console.log(`userData`, userData);
          if (userData?.refreshToken) {
            //  выполнить запрос на рефреш токен
          }
          // dispatch({ type: "setUser", user: null }); // Очищаем данные пользователя
        }
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const localMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        locale,
        Authorization: userData?.accessToken
          ? `Bearer ${userData.accessToken}`
          : "",
      },
    });
    return forward(operation);
  });

  return new ApolloClient({
    link: from([errorLink, localMiddleware, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};
