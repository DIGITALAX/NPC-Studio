import {
  collectPost,
  legacyCollectPost,
} from "../../../graphql/lens/mutations/collect";
import { omit } from "lodash";
import LensHubProxy from "./../../../abis/LensHubProxy.json";
import { WalletClient, PublicClient } from "viem";
import broadcast from "../../../graphql/lens/mutations/broadcast";
import { polygon } from "viem/chains";
import handleIndexCheck from "../../../graphql/lens/queries/indexed";
import { FetchResult } from "@apollo/client";
import { BroadcastOnchainMutation } from "../../../graphql/generated";
import { LENS_HUB_PROXY } from "../constants";
import { Indexar } from "@/components/common/types/common.types";
import { SetStateAction } from "react";

const lensColeccionar = async (
  id: string,
  tipo: string,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void
): Promise<void> => {
  let broadcastResult: FetchResult<BroadcastOnchainMutation>,
    functionName: string,
    args: any[];

  if (
    tipo === "SimpleCollectOpenActionSettings" ||
    tipo === "MultirecipientFeeCollectOpenActionSettings" ||
    tipo === "SimpleCollectOpenActionModule" ||
    tipo === "MultirecipientFeeCollectOpenActionModule"
  ) {
    const { data } = await collectPost({
      for: id,
      actOn: {
        simpleCollectOpenAction:
          tipo === "SimpleCollectOpenActionSettings" ||
          tipo === "SimpleCollectOpenActionModule"
            ? true
            : undefined,
        multirecipientCollectOpenAction:
          tipo === "MultirecipientFeeCollectOpenActionSettings" ||
          tipo === "MultirecipientFeeCollectOpenActionModule"
            ? true
            : undefined,
      },
    });

    const typedData = data?.createActOnOpenActionTypedData.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "Act",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    broadcastResult = await broadcast({
      id: data?.createActOnOpenActionTypedData?.id,
      signature,
    });
    functionName = "act";
    args = [
      {
        publicationActedProfileId: typedData?.value.publicationActedProfileId,
        publicationActedId: typedData?.value.publicationActedId,
        actorProfileId: typedData?.value.actorProfileId,
        referrerProfileIds: typedData?.value.referrerProfileIds,
        referrerPubIds: typedData?.value.referrerPubIds,
        actionModuleAddress: typedData?.value.actionModuleAddress,
        actionModuleData: typedData?.value.actionModuleData,
      },
    ];
  } else {
    const { data } = await legacyCollectPost({
      on: id,
    });

    const typedData = data?.createLegacyCollectTypedData.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "CollectLegacy",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    broadcastResult = await broadcast({
      id: data?.createLegacyCollectTypedData?.id,
      signature,
    });

    functionName = "collectLegacy";
    args = [
      {
        publicationCollectedProfileId:
          typedData?.value.publicationCollectedProfileId,
        publicationCollectedId: typedData?.value.publicationCollectedId,
        collectorProfileId: typedData?.value.collectorProfileId,
        referrerProfileId: typedData?.value.referrerProfileId,
        referrerPubId: typedData?.value.referrerPubId,
        collectModuleData: typedData?.value.collectModuleData,
      },
    ];
  }

  if (broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess") {
    await handleIndexCheck(
      {
        forTxId: broadcastResult?.data?.broadcastOnchain.txId,
      },
      setIndexar,
      setErrorInteraccion
    );
  } else {
    const { request } = await publicClient.simulateContract({
      address: LENS_HUB_PROXY,
      abi: LensHubProxy,
      functionName,
      chain: polygon,
      args,
      account: address,
    });
    const res = await clientWallet.writeContract(request);
    const tx = await publicClient.waitForTransactionReceipt({ hash: res });
    setIndexar(Indexar.Indexando);
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

export default lensColeccionar;
