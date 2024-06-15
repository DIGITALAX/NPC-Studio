import { FetchResult } from "@apollo/client";
import {
  CreateOnchainCommentTypedDataDocument,
  CreateOnchainCommentTypedDataMutation,
  OnchainCommentRequest,
} from "../../generated";
import { apolloClient } from "@/lib/lens/client";

export const commentPost = async (
  request: OnchainCommentRequest
): Promise<FetchResult<CreateOnchainCommentTypedDataMutation>> => {
  return await apolloClient.mutate({
    mutation: CreateOnchainCommentTypedDataDocument,
    variables: {
      request,
    },
  });
};

export default commentPost;
