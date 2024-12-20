import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/client/link/http";
import { onError } from "@apollo/client/link/error";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";

const getCookie = (name: string) => {
  const value = `;  ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const authLink = setContext(async (_, { Headers }) => {
  const token = getCookie("__session");
  return {
    headers: {
      ...Headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const uploadLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  headers: {
    "apollo-require-preflight": "true",
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// todo splitlink for websockets http

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(uploadLink.concat(errorLink)),
  cache,
});

export default client;
