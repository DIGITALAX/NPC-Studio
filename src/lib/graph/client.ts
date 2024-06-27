import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const autographLink = new HttpLink({
  uri: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/8JRara6TGvHV6gKHr5rqeMUsjpAmxe6QHVv8vc23g2KY`,
});


export const autographClient = new ApolloClient({
  link: autographLink,
  cache: new InMemoryCache(),
});
