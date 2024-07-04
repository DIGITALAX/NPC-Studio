import { FetchResult } from "@apollo/client";
import {
  GenerateModuleCurrencyApprovalDataDocument,
  GenerateModuleCurrencyApprovalDataQuery,
  GenerateModuleCurrencyApprovalDataRequest,
} from "../../generated";
import { apolloClient } from "@/lib/lens/client";

const approveCurrency = async (
  request: GenerateModuleCurrencyApprovalDataRequest
): Promise<FetchResult<GenerateModuleCurrencyApprovalDataQuery>> => {
  return await apolloClient.mutate({
    mutation: GenerateModuleCurrencyApprovalDataDocument,
    variables: {
      request,
    },
  });
};

export default approveCurrency;
