import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const autographLink = new HttpLink({
  uri: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/AMQAWNsEmNfMttyMQ6mEpqb8z2eeHUNrFcYDuZ2KPsYg`,
});

export const autographClient = new ApolloClient({
  link: autographLink,
  cache: new InMemoryCache(),
});
