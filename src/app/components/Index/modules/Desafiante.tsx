import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { FunctionComponent, JSX } from "react";
import Seleccion from "./Seleccion";
import { DesafianteProps } from "../types/index.type";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const Desafiante: FunctionComponent<DesafianteProps> = ({
  agentCollectionsCargando,
  agentCollections,
  desafiantes,
  dict,
  setDesafiantes,
  indice,
  setMostrarPerfil,
}): JSX.Element => {
  const router = useRouter();
  return (
    <div
      className={`relative w-full gal:w-60 xl:w-80 h-fit flex items-center justify-between flex-col gap-3`}
    >
      <div className="relative w-full h-fit flex items-center justify-center">
        <div
          className={`relative w-full h-96 flex items-stretch justify-start flex-col gap-4 p-5`}
        >
          <div className={`absolute top-0 left-0 w-full h-full flex `}>
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmPQaDcs5gEYtrqXsz3pvLzu3919a4BXmBAE8McrZyJEor`}
              layout="fill"
              objectFit="fill"
              draggable={false}
              className={` ${
                (agentCollectionsCargando || agentCollections?.length < 1) &&
                "animate-pulse"
              }`}
            />
          </div>
          {agentCollections?.length > 0 && (
            <>
              <div className="relative w-full h-fit flex flex-row items-center justify-between gap-3 bg-black/40 p-1 rounded-md">
                <div
                  className="relative flex flex-row w-full h-full text-white font-aust items-center justify-start gap-2 cursor-pointer"
                  onClick={() =>
                    setMostrarPerfil(desafiantes?.[indice]?.account?.address)
                  }
                >
                  <div
                    className={`relative rounded-full flex bg-black w-6 h-6 items-center justify-center`}
                  >
                    <Image
                      src={handleProfilePicture(
                        desafiantes?.[indice]?.account?.metadata?.picture
                      )}
                      objectFit="cover"
                      alt="pfp"
                      layout="fill"
                      className="relative w-fit h-fit rounded-full items-center justify-center flex"
                      draggable={false}
                    />
                  </div>
                  <div className="relative items-center justify-center w-fit h-fit text-xs flex break-all">
                    {desafiantes?.[indice]?.account?.username?.localName}
                  </div>
                </div>
                <div className="relative w-full h-fit flex items-center justify-end">
                  <div
                    className="relative w-24 text-xs font-bit text-viol h-8 flex items-center justify-center cursor-pointer hover:opacity-70"
                    onClick={() =>
                      router.push(
                        `/agent/${desafiantes?.[indice]?.account?.username?.localName}`
                      )
                    }
                  >
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
                      layout="fill"
                      objectFit="fill"
                      draggable={false}
                    />
                    <div className="absolute w-full h-full flex items-center justify-center whitespace-nowrap">
                      {dict.Home.espectar}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full h-full flex flex-row items-center justify-between gap-3">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/${desafiantes?.[indice]?.tapa}`}
                    layout="fill"
                    objectFit="contain"
                    draggable={false}
                  />
                </div>
                <div className="relative w-full h-fit bg-black/80 p-2 flex flex-col items-center justify-between gap-2 text-xxs font-super text-sol">
                  <div className="relative w-full h-px flex items-start justify-start bg-azulito"></div>
                  <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {dict.Home.auEarned}
                    </div>
                    <div className="relative w-fit h-fit flex items-center justify-center text-xxxs">
                      {(
                        Number(desafiantes?.[indice]?.score?.auTotal) || 0
                      )?.toFixed(2) || "0"}{" "}
                      $AU
                    </div>
                  </div>
                  <div className="relative w-full h-px flex items-start justify-start bg-[#F6FC8D]"></div>
                  <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {dict.Home.currentScore}
                    </div>
                    <div className="relative w-fit h-fit text-xxxs flex items-center justify-center">
                      {desafiantes?.[indice]?.score?.activity?.reduce(
                        (sum, el) => Number(el?.spectateMetadata?.global) + sum,
                        0
                      ) || 0}
                    </div>
                  </div>
                  <div className="relative w-full h-px flex items-start justify-start bg-[#09FF6B]"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {agentCollections?.length > 0 && (
        <Seleccion
          desafiantes={desafiantes}
          setDesafiantes={setDesafiantes}
          agentCollections={agentCollections}
          indice={indice}
        />
      )}
    </div>
  );
};

export default Desafiante;
