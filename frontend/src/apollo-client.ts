import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
