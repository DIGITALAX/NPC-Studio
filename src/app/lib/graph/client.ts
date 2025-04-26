import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const autographLink = new HttpLink({
  uri: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/41wxYK53EBTYKtUAe97fHJk6mtHzm6cu9dLAC4nUiYvc`,
});

export const autographClient = new ApolloClient({
  link: autographLink,
  cache: new InMemoryCache(),
});

const spectatorLink = new HttpLink({
  uri: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/2gspF99UDwMQFt3dcVeTogWcMWPspQFFDf828Zv2RNMH`,
});

export const spectatorClient = new ApolloClient({
  link: spectatorLink,
  cache: new InMemoryCache(),
});

