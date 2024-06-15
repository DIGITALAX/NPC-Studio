import { FetchResult } from "@apollo/client";
import {
  ValidatePublicationMetadataRequest,
  ValidatePublicationMetadataDocument,
  ValidatePublicationMetadataQuery,
} from "../../generated";
import { authClient } from "@/lib/lens/client";

const validateMetadata = async (
  request: ValidatePublicationMetadataRequest
): Promise<FetchResult<ValidatePublicationMetadataQuery>> => {
  return await authClient.query({
    query: ValidatePublicationMetadataDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default validateMetadata;
