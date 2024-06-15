import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const autographLink = new HttpLink({
  uri: "https://api.studio.thegraph.com/query/37770/autograph/version/latest",
});

export const autographClient = new ApolloClient({
  link: autographLink,
  cache: new InMemoryCache(),
});

const httpLinkPrint = new HttpLink({
  uri: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/DcuUkg3QC5zg1t86VeNjWzg6R6ohaGa8QGyVE1rFYMZB`,
});

export const printClient = new ApolloClient({
  link: httpLinkPrint,
  cache: new InMemoryCache(),
});

