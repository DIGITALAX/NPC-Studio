import { FetchResult } from "@apollo/client";
import {
  CreateOnchainPostTypedDataDocument,
  CreateOnchainPostTypedDataMutation,
  OnchainPostRequest,
} from "../../generated";
import { apolloClient } from "@/lib/lens/client";

const postOnChain = async (
  request: OnchainPostRequest
): Promise<FetchResult<CreateOnchainPostTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateOnchainPostTypedDataDocument,
    variables: {
      request,
    },
  });
};
export default postOnChain;
