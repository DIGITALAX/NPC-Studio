import { FetchResult } from "@apollo/client";
import {
  LensTransactionStatusRequest,
  LensTransactionStatusQuery,
  LensTransactionStatusDocument,
  LensTransactionStatusType,
} from "../../generated";
import { apolloClient } from "@/lib/lens/client";
import { SetStateAction } from "react";
import { Indexar } from "@/components/common/types/common.types";

const handleIndexCheck = async (
  tx: LensTransactionStatusRequest,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void
) => {
  const indexedStatus = await pollUntilIndexed(tx);
  if (indexedStatus) {
    setIndexar(Indexar.Exito);
  } else {
    setErrorInteraccion(true);
  }

  const timeoutId = setTimeout(() => {
    setIndexar(Indexar.Inactivo);
  }, 3000);

  return () => clearTimeout(timeoutId);
};

export const getIndexed = async (
  request: LensTransactionStatusRequest
): Promise<FetchResult<LensTransactionStatusQuery>> => {
  return await apolloClient.query({
    query: LensTransactionStatusDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};

const pollUntilIndexed = async (
  request: LensTransactionStatusRequest
): Promise<boolean> => {
  let count = 0;
  while (count < 10) {
    try {
      const { data } = await getIndexed(request);
      if (data && data?.lensTransactionStatus) {
        switch (data?.lensTransactionStatus.status) {
          case LensTransactionStatusType.Failed:
            return false;
          case LensTransactionStatusType.OptimisticallyUpdated:
          case LensTransactionStatusType.Complete:
            return true;
          case LensTransactionStatusType.Processing:
            count += 1;
            await new Promise((resolve) => setTimeout(resolve, 6000));
            if (count == 10) return true;
            break;
          default:
            throw new Error("Unexpected status");
        }
      }
    } catch (err: any) {
      count += 1;
      console.error(err.message);
      continue;
    }
  }
  return false;
};

export default handleIndexCheck;
