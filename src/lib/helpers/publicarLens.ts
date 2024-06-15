import { omit } from "lodash";
import LensHubProxy from "./../../../abis/LensHubProxy.json";
import { OpenActionModuleInput, InputMaybe } from "../../../graphql/generated";
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

const publicarLens = async (
  contentURI: string,
  openActionModules: InputMaybe<OpenActionModuleInput[]> | undefined,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  closeBox?: () => void,
  create?: boolean
): Promise<void> => {
  if (
    openActionModules &&
    openActionModules?.[0]?.hasOwnProperty("collectOpenAction") &&
    openActionModules?.[0]?.collectOpenAction?.hasOwnProperty(
      "simpleCollectOpenAction"
    ) &&
    openActionModules?.[0]?.collectOpenAction?.simpleCollectOpenAction
  ) {
    openActionModules = limpiarColeccion(openActionModules);
  } else if (!create) {
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

  if (!metadata?.data?.validatePublicationMetadata.valid) {
    setErrorInteraccion(true);
    return;
  }

  const data = await postOnChain({
    contentURI,
    openActionModules,
  });

  const typedData = data?.data?.createOnchainPostTypedData?.typedData;

  const signature = await clientWallet.signTypedData({
    domain: omit(typedData?.domain, ["__typename"]),
    types: omit(typedData?.types, ["__typename"]),
    primaryType: "Post",
    message: omit(typedData?.value, ["__typename"]),
    account: address as `0x${string}`,
  });

  const broadcastResult = await broadcast({
    id: data?.data?.createOnchainPostTypedData?.id,
    signature,
  });

  if (broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess") {
    setIndexar(Indexar.Indexando);

    closeBox && closeBox();
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
      functionName: "post",
      chain: polygon,
      args: [
        {
          profileId: parseInt(typedData?.value.profileId, 16),
          contentURI: typedData?.value.contentURI,
          actionModules: typedData?.value?.actionModules,
          actionModulesInitDatas: typedData?.value?.actionModulesInitDatas,
          referenceModule: typedData?.value?.referenceModule,
          referenceModuleInitData: typedData?.value?.referenceModuleInitData,
        },
      ],
      account: address,
    });

    const res = await clientWallet.writeContract(request);
    setIndexar(Indexar.Indexando);
    closeBox && closeBox();
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
