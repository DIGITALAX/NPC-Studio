import { omit } from "lodash";
import LensHubProxy from "./../../../abis/LensHubProxy.json";
import {
  OpenActionModuleInput,
  InputMaybe,
  CreateOnchainCommentTypedDataMutation,
  CreateOnchainPostTypedDataMutation,
  CreateOnchainCommentEip712TypedDataValue,
  CreateOnchainQuoteTypedDataMutation,
} from "../../../graphql/generated";
import { polygon } from "viem/chains";
import { PublicClient, WalletClient } from "viem";
import postOnChain from "../../../graphql/lens/mutations/post";
import broadcast from "../../../graphql/lens/mutations/broadcast";
import handleIndexCheck from "../../../graphql/lens/queries/indexed";
import { LENS_HUB_PROXY } from "../constants";
import limpiarColeccion from "./limpiarColeccion";
import { SetStateAction } from "react";
import { Indexar } from "@/components/common/types/common.types";
import validateMetadata from "../../../graphql/lens/queries/validate";
import commentPost from "../../../graphql/lens/mutations/comment";
import quotePost from "../../../graphql/lens/mutations/quote";

const publicarLens = async (
  contentURI: string,
  openActionModules: InputMaybe<OpenActionModuleInput[]> | undefined,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  setCargando: () => void,
  comentario?: string,
  creacion?: boolean,
  quote?: boolean
): Promise<void> => {
  if (
    openActionModules &&
    openActionModules?.[0]?.hasOwnProperty("collectOpenAction") &&
    openActionModules?.[0]?.collectOpenAction?.hasOwnProperty(
      "simpleCollectOpenAction"
    ) &&
    openActionModules?.[0]?.collectOpenAction?.simpleCollectOpenAction
  ) {
    openActionModules = limpiarColeccion(openActionModules, address);

  } else if (!creacion) {
    openActionModules = [
      {
        collectOpenAction: {
          simpleCollectOpenAction: {
            followerOnly: false,
          },
        },
      },
    ];
  }

  const metadata = await validateMetadata({
    rawURI: contentURI,
  });

  if (!metadata?.data?.validatePublicationMetadata?.valid) {
    setErrorInteraccion(true);
    setCargando();
    return;
  }

  const data = quote
    ? await quotePost({
        quoteOn: comentario,
        contentURI: contentURI,
        openActionModules,
      })
    : comentario
    ? await commentPost({
        commentOn: comentario,
        contentURI: contentURI,
        openActionModules,
      })
    : await postOnChain({
        contentURI,
        openActionModules,
      });

  const typedData = quote
    ? (data?.data as CreateOnchainQuoteTypedDataMutation)
        ?.createOnchainQuoteTypedData?.typedData
    : comentario
    ? (data?.data as CreateOnchainCommentTypedDataMutation)
        ?.createOnchainCommentTypedData?.typedData
    : (data?.data as CreateOnchainPostTypedDataMutation)
        ?.createOnchainPostTypedData?.typedData;

  const signature = await clientWallet.signTypedData({
    domain: omit(typedData?.domain, ["__typename"]),
    types: omit(typedData?.types, ["__typename"]),
    primaryType: quote ? "Quote" : comentario ? "Comment" : ("Post" as any),
    message: omit(typedData?.value, ["__typename"]) as any,
    account: address as `0x${string}`,
  });

  const broadcastResult = await broadcast({
    id: quote
      ? (data?.data as CreateOnchainQuoteTypedDataMutation)
          ?.createOnchainQuoteTypedData?.id
      : comentario
      ? (data?.data as CreateOnchainCommentTypedDataMutation)
          ?.createOnchainCommentTypedData?.id
      : (data?.data as CreateOnchainPostTypedDataMutation)
          ?.createOnchainPostTypedData?.id,
    signature,
  });

  if (broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess") {
    setIndexar(Indexar.Indexando);

    await handleIndexCheck(
      {
        forTxId: broadcastResult?.data?.broadcastOnchain?.txId,
      },
      setIndexar,
      setErrorInteraccion
    );
  } else {
    const { request } = await publicClient.simulateContract({
      address: LENS_HUB_PROXY,
      abi: LensHubProxy,
      functionName: quote ? "quote" : comentario ? "comment" : "post",
      chain: polygon,
      args: [
        comentario || quote
          ? {
              profileId: typedData?.value.profileId,
              contentURI: typedData?.value.contentURI,
              pointedProfileId: (
                typedData?.value as CreateOnchainCommentEip712TypedDataValue
              ).pointedProfileId,
              pointedPubId: (
                typedData?.value as CreateOnchainCommentEip712TypedDataValue
              ).pointedPubId,
              referrerProfileIds: (
                typedData?.value as CreateOnchainCommentEip712TypedDataValue
              ).referrerProfileIds,
              referrerPubIds: (
                typedData?.value as CreateOnchainCommentEip712TypedDataValue
              ).referrerPubIds,
              referenceModuleData: (
                typedData?.value as CreateOnchainCommentEip712TypedDataValue
              ).referenceModuleData,
              actionModules: typedData?.value.actionModules,
              actionModulesInitDatas: typedData?.value.actionModulesInitDatas,
              referenceModule: typedData?.value.referenceModule,
              referenceModuleInitData: typedData?.value.referenceModuleInitData,
            }
          : {
              profileId: parseInt(typedData?.value.profileId, 16),
              contentURI: typedData?.value.contentURI,
              actionModules: typedData?.value?.actionModules,
              actionModulesInitDatas: typedData?.value?.actionModulesInitDatas,
              referenceModule: typedData?.value?.referenceModule,
              referenceModuleInitData:
                typedData?.value?.referenceModuleInitData,
            },
      ],
      account: address,
    });

    const res = await clientWallet.writeContract(request);
    setIndexar(Indexar.Indexando);
    const tx = await publicClient.waitForTransactionReceipt({ hash: res });
    await handleIndexCheck(
      {
        forTxHash: tx.transactionHash,
      },
      setIndexar,
      setErrorInteraccion
    );
  }
  setTimeout(() => {
    setIndexar(Indexar.Inactivo);
  }, 3000);
};

export default publicarLens;
