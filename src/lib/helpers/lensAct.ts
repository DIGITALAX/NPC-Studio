import { ActOnOpenActionInput } from "../../../graphql/generated";
import { collectPost } from "../../../graphql/lens/mutations/collect";
import { omit } from "lodash";
import { WalletClient, PublicClient } from "viem";
import broadcast from "../../../graphql/lens/mutations/broadcast";
import handleIndexCheck from "../../../graphql/lens/queries/indexed";
import LensHubProxy from "./../../../abis/LensHubProxy.json";
import { Indexar } from "@/components/common/types/common.types";
import { polygonAmoy } from "viem/chains";
import { LENS_HUB_PROXY } from "../constants";
import { SetStateAction } from "react";

const lensAct = async (
  pubId: string,
  actOn: ActOnOpenActionInput,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void
): Promise<void> => {
  try {
    const { data } = await collectPost({
      for: pubId,
      actOn,
    });

    const typedData = data?.createActOnOpenActionTypedData.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "Act",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    const broadcastResult = await broadcast({
      id: data?.createActOnOpenActionTypedData?.id,
      signature,
    });

    if (
      broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess"
    ) {
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
        functionName: "act",
        chain: polygonAmoy,
        args: [
          {
            publicationActedProfileId: parseInt(
              typedData?.value.publicationActedProfileId,
              16
            ),
            publicationActedId: parseInt(
              typedData?.value.publicationActedId,
              16
            ),
            actorProfileId: parseInt(typedData?.value.actorProfileId, 16),
            referrerProfileIds: typedData?.value.referrerProfileIds,
            referrerPubIds: typedData?.value.referrerPubIds,
            actionModuleAddress: typedData?.value.actionModuleAddress,
            actionModuleData: typedData?.value.actionModuleData,
          },
        ],
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

      setIndexar(Indexar.Indexando);
    }
  } catch (err: any) {
    setErrorInteraccion(true);
    console.error(err.message);
  }
};

export default lensAct;
