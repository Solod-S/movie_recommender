import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const httpLink = new HttpLink({
  uri: SERVER_URL,
  credentials: "same-origin",
});

export const createApolloClient = (locale, userData) => {
  const localMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        locale,
        Authorization: userData?.accessToken ? userData?.accessToken : "",
      },
    });
    return forward(operation);
  });

  return new ApolloClient({
    link: from([localMiddleware, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};
