import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const getSpectatorUri = () => {
  if (typeof window === "undefined") {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return `${baseUrl}/api/graphql/spectator`;
  }
  return "/api/graphql/spectator";
};

const httpLinkSpectator = new HttpLink({
  uri: getSpectatorUri(),
});

export const spectatorClient = new ApolloClient({
  link: httpLinkSpectator,
  cache: new InMemoryCache(),
});

const getAutographUri = () => {
  if (typeof window === "undefined") {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return `${baseUrl}/api/graphql/autograph`;
  }
  return "/api/graphql/autograph";
};

const httpLinkAutograph = new HttpLink({
  uri: getAutographUri(),
});

export const autographClient = new ApolloClient({
  link: httpLinkAutograph,
  cache: new InMemoryCache(),
});
