import { FetchResult } from "@apollo/client";
import {
  ActOnOpenActionRequest,
  CreateActOnOpenActionTypedDataDocument,
  CreateActOnOpenActionTypedDataMutation,
  CreateLegacyCollectTypedDataDocument,
  CreateLegacyCollectTypedDataMutation,
  LegacyCollectRequest,
} from "../../generated";
import { apolloClient } from "@/lib/lens/client";

export const collectPost = async (
  request: ActOnOpenActionRequest
): Promise<FetchResult<CreateActOnOpenActionTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateActOnOpenActionTypedDataDocument,
    variables: {
      request: request,
    },
  });
};

export const legacyCollectPost = async (
  request: LegacyCollectRequest
): Promise<FetchResult<CreateLegacyCollectTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateLegacyCollectTypedDataDocument,
    variables: {
      request: request,
    },
  });
};
