import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const autographLink = new HttpLink({
  uri: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/8JRara6TGvHV6gKHr5rqeMUsjpAmxe6QHVv8vc23g2KY`,
});

export const autographClient = new ApolloClient({
  link: autographLink,
  cache: new InMemoryCache(),
});

const npcLink = new HttpLink({
  uri: `https://api.studio.thegraph.com/query/37770/npc-test/version/latest`,
});

export const npcClient = new ApolloClient({
  link: npcLink,
  cache: new InMemoryCache(),
});
