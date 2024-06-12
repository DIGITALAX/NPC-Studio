import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { ProcessProps } from "../types/game.types";
import { AiOutlineLoading } from "react-icons/ai";

function Process({
  mint,
  setMint,
  dict,
  manejarMintear,
  mintCargando,
  esArtista,
  openConnectModal,
  setMostrarNotificacion,
  isConnected,
}: ProcessProps) {
  switch (mint) {
    case 1:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmanpFJZmunhedHndu398hbgkB1z48EH1iX3gK5nVZnoaC`}
            draggable={false}
            layout="fill"
            priority
          />
          <div
            className="flex justify-end bottom-2 right-0 absolute items-end cursor-pointer w-28 h-6"
            onClick={() => setMint(2)}
          ></div>
        </div>
      );

    case 2:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute h-full w-full flex items-center justify-center">
            <Image
              draggable={false}
              src={`${INFURA_GATEWAY}/ipfs/QmR3LnrzJT7N33hTsdHtALAq23uKXi41Ru96CSi64FE4QJ`}
              layout="fill"
              priority
            />
          </div>
          <div className="relative w-full h-fit flex flex-col gap-4 items-center justify-center">
            <div className="relative w-[80vw] sm:w-[55vw] h-[35vh] xl:w-[35vw] xl:h-[35vh] items-center justify-center flex border-dorado rounded-md border-2">
              <Image
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/QmehJ5XtHxAv9zvfHBLs1rG7SS3zaAKaptDQC15dmKXvDD`}
                layout="fill"
                className="rounded-md"
              />
            </div>
            <div className="relative w-full h-fit flex items-center justify-center gap-2 flex-col font-arc text-white text-xs">
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict.Home.auth}
              </div>
              <div
                className="relative w-fit h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-md cursor-pointer active:scale-95 px-1.5 py-1"
                onClick={
                  esArtista
                    ? () => setMint(3)
                    : isConnected
                    ? () => setMostrarNotificacion(true)
                    : openConnectModal
                }
              >
                {dict.Home.mint}
              </div>
            </div>
            <div className="relative w-full h-fit flex items-center justify-center gap-1.5 sm:gap-3 flex-row">
              {[
                "QmbsEYaoULeg7TXkmiMFHtA2dDkqXYHzfoYsfoLrYM4r24",
                "QmQgEq3EWgVEJZWch8KYMRKFxtZ4vLJCUwApNxjjJ7sQnw",
                "QmY4H3tPERwPW6WHnV7iycDt7X5JaTxKALrmj17zVKeAJr",
              ].map((imagen: string, indice: number) => {
                return (
                  <div
                    key={indice}
                    className="relative xl:w-[10vw] w-[25vw] sm:w-[15vw] xl:h-[8vh] h-[7vh] sm:h-[12vh] flex items-center justify-center border-dorado rounded-md border-2"
                  >
                    <Image
                      draggable={false}
                      src={`${INFURA_GATEWAY}/ipfs/${imagen}`}
                      className="rounded-md"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute h-full w-full flex items-center justify-center">
            <Image
              draggable={false}
              src={`${INFURA_GATEWAY}/ipfs/QmR3LnrzJT7N33hTsdHtALAq23uKXi41Ru96CSi64FE4QJ`}
              layout="fill"
              priority
            />
          </div>
          <div className="relative w-full h-fit flex flex-col gap-4 items-center justify-center text-white font-vcr">
            <div className="relative w-fit h-fit flex items-center justify-center">Create New Gallery</div>
            <div className="relative w-full h-fit flex items-center justify-center flex-row gap-3">
              <div >Create Item</div>

            </div>
            <div
              className="relative w-fit h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-md cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
              onClick={() => !mintCargando && manejarMintear()}
            >
              {!mintCargando ? (
                dict.Home.cat
              ) : (
                <AiOutlineLoading size={15} color="white" />
              )}
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute h-full w-full flex items-center justify-center">
            <Image
              draggable={false}
              src={`${INFURA_GATEWAY}/ipfs/QmR3LnrzJT7N33hTsdHtALAq23uKXi41Ru96CSi64FE4QJ`}
              layout="fill"
              priority
            />
          </div>
          <div className="relative w-full h-fit flex flex-col gap-12 items-center justify-center font-arc text-white">
            <div className="relative break-words flex items-center justify-center text-2xl sm:text-5xl w-fit h-fit text-center">
              {dict.Home.comp}
            </div>
            <div className="relative w-full h-fit flex items-center justify-center flex-row gap-4">
              <div
                className="relative w-32 h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-md cursor-pointer active:scale-95 px-1.5 py-1 text-xs"
                onClick={() => setMint(3)}
              >
                {!mintCargando ? (
                  dict.Home.again
                ) : (
                  <AiOutlineLoading size={15} color="white" />
                )}
              </div>
              <div
                className="relative w-32 h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-md cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                onClick={() => setMint(1)}
              >
                {!mintCargando ? (
                  dict.Home.exit
                ) : (
                  <AiOutlineLoading size={15} color="white" />
                )}
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Process;
