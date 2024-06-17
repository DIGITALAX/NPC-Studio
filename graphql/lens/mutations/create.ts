import { FetchResult } from "@apollo/client";
import {
  CreateProfileWithHandleDocument,
  CreateProfileWithHandleMutation,
  CreateProfileWithHandleRequest,
} from "../../generated";
import { authClient } from "@/lib/lens/client";

const createProfile = async (
  request: CreateProfileWithHandleRequest
): Promise<FetchResult<CreateProfileWithHandleMutation>>=> {
  return await authClient.mutate({
    mutation: CreateProfileWithHandleDocument,
    variables: {
      request: request,
    },
  });
};

export default createProfile;
