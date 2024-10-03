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

const refreshToken = async refreshToken => {
  try {
    const response = await fetch(`${SERVER_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation RefreshTokens($refreshToken: String!) {
            refreshTokens(refreshToken: $refreshToken) {
              accessToken
              refreshToken
              user {
                id
                name
                email
              }
            }
          }
        `,
        variables: { refreshToken },
      }),
    });

    const { data } = await response.json();
    return data.refreshTokens;
  } catch (error) {
    console.error("Ошибка обновления токена:", error);
    return null;
  }
};

export const createApolloClient = ({ locale, userData, dispatch }) => {
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const { message } of graphQLErrors) {
          if (message === "Context creation failed: Not authenticated") {
            // Если токен истек, пробуем обновить
            if (userData?.refreshToken) {
              return refreshToken(userData.refreshToken).then(newUserData => {
                if (newUserData) {
                  // Обновляем токены
                  userData.accessToken = newUserData.accessToken;
                  userData.refreshToken = newUserData.refreshToken;
                  console.log(`newUserData`, newUserData);
                  dispatch({ type: "setUser", user: newUserData });

                  // Обновляем заголовки и повторяем запрос
                  operation.setContext(({ headers = {} }) => ({
                    headers: {
                      ...headers,
                      Authorization: `Bearer ${newUserData.accessToken}`,
                    },
                  }));

                  return forward(operation);
                } else {
                  dispatch({ type: "setUser", user: null }); // Если не удалось обновить токены, очищаем пользователя
                  operation.setContext(({ headers = {} }) => ({
                    headers: {
                      ...headers,
                      Authorization: "",
                    },
                  }));
                }
              });
            } else {
              dispatch({ type: "setUser", user: null });
            }
          }
        }
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

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
