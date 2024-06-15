import { omit } from "lodash";
import LensHubProxy from "./../../../abis/LensHubProxy.json";
import { polygon } from "viem/chains";
import { PublicClient, WalletClient } from "viem";
import broadcast from "../../../graphql/lens/mutations/broadcast";
import mirrorPost from "../../../graphql/lens/mutations/mirror";
import handleIndexCheck from "../../../graphql/lens/queries/indexed";
import { Indexar } from "@/components/common/types/common.types";
import { LENS_HUB_PROXY } from "../constants";
import { SetStateAction } from "react";

const lensMirror = async (
  mirrorOn: string,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void
): Promise<void> => {
  const data = await mirrorPost({
    mirrorOn,
  });

  const typedData = data?.data?.createOnchainMirrorTypedData?.typedData;

  const signature = await clientWallet.signTypedData({
    domain: omit(typedData?.domain, ["__typename"]),
    types: omit(typedData?.types, ["__typename"]),
    primaryType: "Mirror",
    message: omit(typedData?.value, ["__typename"]),
    account: address as `0x${string}`,
  });

  const broadcastResult = await broadcast({
    id: data?.data?.createOnchainMirrorTypedData?.id,
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
      functionName: "mirror",
      chain: polygon,
      args: [
        {
          profileId: typedData?.value.profileId,
          metadataURI: typedData?.value.metadataURI,
          pointedProfileId: typedData?.value.pointedProfileId,
          pointedPubId: typedData?.value.pointedPubId,
          referrerProfileIds: typedData?.value.referrerProfileIds,
          referrerPubIds: typedData?.value.referrerPubIds,
          referenceModuleData: typedData?.value.referenceModuleData,
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

export default lensMirror;
