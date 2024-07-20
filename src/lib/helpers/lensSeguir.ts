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
import follow from "../../../graphql/lens/mutations/follow";
import unfollow from "../../../graphql/lens/mutations/unfollow";
import { BroadcastOnchainMutation } from "../../../graphql/generated";
import { FetchResult } from "@apollo/client";

const lensSeguir = async (
  seguir: boolean,
  profileId: string,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void
): Promise<void> => {
  let broadcastResult: FetchResult<BroadcastOnchainMutation>, args: any[];
  if (seguir) {
    const data = await follow({
      follow: [
        {
          profileId,
        },
      ],
    });

    const typedData = data?.data?.createFollowTypedData?.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "Follow",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    broadcastResult = await broadcast({
      id: data?.data?.createFollowTypedData?.id,
      signature,
    });

    args = [
      typedData?.value?.followerProfileId,
      typedData?.value?.idsOfProfilesToFollow,
      typedData?.value?.followTokenIds,
      typedData?.value?.datas,
    ];
  } else {
    const data = await unfollow({
      unfollow: [
        {
          profileId,
        },
      ],
    });

    const typedData = data?.data?.createUnfollowTypedData?.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "Unfollow",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    broadcastResult = await broadcast({
      id: data?.data?.createUnfollowTypedData?.id,
      signature,
    });

    args = [
      typedData?.value?.unfollowerProfileId,
      typedData?.value?.idsOfProfilesToUnfollow,
    ];
  }

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
      functionName: seguir ? "follow" : "unfollow",
      chain: polygon,
      args,
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

export default lensSeguir;
