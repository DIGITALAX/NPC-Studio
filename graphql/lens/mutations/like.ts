import { FetchResult } from "@apollo/client";
import {
  AddReactionDocument,
  AddReactionMutation,
  ReactionRequest,
} from "../../generated";
import { apolloClient } from "@/lib/lens/client";

const likePost = async (
  request: ReactionRequest
): Promise<FetchResult<AddReactionMutation>> => {
  return await apolloClient.mutate({
    mutation: AddReactionDocument,
    variables: {
      request: request,
    },
  });
};

export default likePost;
