import { FunctionComponent, JSX, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import useVotar from "../hooks/useVotar";
import { useAccount } from "wagmi";
import { ModalContext } from "@/app/providers";
import { createPublicClient, http } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import useLens from "../../Common/hooks/useLens";
import { useModal } from "connectkit";

const Evaluacion: FunctionComponent<{ dict: any; agente: string }> = ({
  dict,
  agente,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const { openSwitchNetworks, openOnboarding } = useModal();
  const { isConnected, address, chainId } = useAccount();
  const { handleConectarse } = useLens(
    isConnected,
    address,
    dict,
    publicClient
  );
  const { manejarVotar, npcVotar, setNPCVotar, votarCargando } = useVotar(
    address,
    dict,
    publicClient,
    agente
  );
  return (
    <div className="relative w-full h-fit gap-6 items-start justify-start font-clar text-xs text-white flex flex-col">
      <div className="relative w-full h-fit flex sm:flex-row flex-col gap-2 items-center justify-center">
        <div className="relative w-fit h-fit flex items-center justify-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image
              layout="fill"
              src={`${INFURA_GATEWAY}/ipfs/QmPMxS2CJ1P4oYPDtfUY7Y2kmwdzg4yD3f5rLzmvTwg42g`}
              draggable={false}
              objectFit="contain"
            />
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-2 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.global}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.globalD}
            </div>
          </div>
          <input
            type="range"
            id="input10"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                global: Number(e.target.value),
              }))
            }
            value={npcVotar.global}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-gris">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-fit gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.modelo}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.modD}
            </div>
          </div>
          <input
            type="range"
            id="input1"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                model: Number(e.target.value),
              }))
            }
            value={npcVotar.model}
          />
          <div className="relative w-full  flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-nubes">
            <div className="relative w-fit h-fit flex items-center justify-center break-all">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.chatContexto}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.conD}
            </div>
          </div>
          <input
            type="range"
            id="input2"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                chatContext: Number(e.target.value),
              }))
            }
            value={npcVotar.chatContext}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-rayas">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.scene}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.sceneD}
            </div>
          </div>
          <input
            type="range"
            id="input3"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                scene: Number(e.target.value),
              }))
            }
            value={npcVotar.scene}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-viol">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.personalidad}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.perD}
            </div>
          </div>
          <input
            type="range"
            id="input4"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                personality: Number(e.target.value),
              }))
            }
            value={npcVotar.personality}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-verde">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.appearance}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.appD}
            </div>
          </div>
          <input
            type="range"
            id="input7"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                appearance: Number(e.target.value),
              }))
            }
            value={npcVotar.appearance}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-costa">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.tokenizer}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.tokenD}
            </div>
          </div>
          <input
            type="range"
            id="input8"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                tokenizer: Number(e.target.value),
              }))
            }
            value={npcVotar.tokenizer}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-fresas">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.spriteSheet}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.spriteD}
            </div>
          </div>
          <input
            type="range"
            id="input9"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                spriteSheet: Number(e.target.value),
              }))
            }
            value={npcVotar.spriteSheet}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-gris">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.training}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.trainD}
            </div>
          </div>
          <input
            type="range"
            id="input1"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                training: Number(e.target.value),
              }))
            }
            value={npcVotar.training}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-nubes">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.collections}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.collD}
            </div>
          </div>
          <input
            type="range"
            id="input2"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                collections: Number(e.target.value),
              }))
            }
            value={npcVotar.collections}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-rayas">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-start justify-start">
          <div className="relative text-left w-fit h-fit flex items-start justify-start flex-col gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start break-all">
              {dict.Home.lora}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start font-lib break-words text-xxs text-white/70">
              {dict.Home.loraD}
            </div>
          </div>
          <input
            type="range"
            id="input3"
            className="w-full"
            max="100"
            min="0"
            onChange={(e) =>
              setNPCVotar((prev) => ({
                ...prev,
                lora: Number(e.target.value),
              }))
            }
            value={npcVotar.lora}
          />
          <div className="relative w-full flex items-center justify-between gap-1 font-lib text-xxs break-all text-center text-viol">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.incon}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.ad}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {dict.Home.imp}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex relative gap-3 justify-between items-center">
        <div className="relative w-full h-fit flex flex-col gap-2 items-start justify-start">
          <div className="relative w-fit h-fit flex items-start justify-center font-lib text-white text-xxs">
            {dict.Home.addic}
          </div>
          <div className="relative w-full h-32 flex items-center justify-center rounded-sm border border-azulito">
            <textarea
              className="bg-black p-1 w-full h-full flex text-white font-lib text-sm rounded-sm"
              style={{
                resize: "none",
              }}
              onChange={(e) =>
                setNPCVotar((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              value={npcVotar.comment}
            />
          </div>
        </div>
      </div>
      <div
        className={`relative flex items-center justify-center rounded-sm border border-azulito w-20 h-8 bg-viol px-2 py-1 font-lib text-xs text-white cursor-pointer active:scale-95`}
        onClick={
          !votarCargando
            ? !isConnected
              ? chainId !== 232
                ? () => openSwitchNetworks?.()
                : () => openOnboarding?.()
              : !contexto?.lensConectado?.profile && isConnected
              ? () => handleConectarse()
              : () => manejarVotar()
            : () => {}
        }
      >
        <div
          className={`${
            votarCargando && "animate-spin"
          } flex items-center justify-center w-fit h-fit flex`}
        >
          {votarCargando ? (
            <AiOutlineLoading size={15} color={"white"} />
          ) : (
            dict.Home.espectar
          )}
        </div>
      </div>
    </div>
  );
};

export default Evaluacion;
