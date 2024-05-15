import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import { ProcessProps } from "../types/game.types";

function Process({ artists, setArtists, t }: ProcessProps) {
  switch (artists) {
    case 1:
      return (
        <div className="relative w-[100vw] lg:w-[70vw] xl:w-[60vw] h-fit max-h-[90vh] min-h-[40vh] xl:min-h-[60vh] flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmanpFJZmunhedHndu398hbgkB1z48EH1iX3gK5nVZnoaC`}
            draggable={false}
            layout="fill"
            priority
          />
          <div
            className="flex justify-end bottom-2 right-0 absolute items-end cursor-pointer w-28 h-6"
            onClick={() => setArtists(2)}
          ></div>
        </div>
      );

    case 2:
      return (
        <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
          <div className="absolute h-full w-full flex items-center justify-center">
            <Image
              draggable={false}
              src={`${INFURA_GATEWAY}/ipfs/QmR3LnrzJT7N33hTsdHtALAq23uKXi41Ru96CSi64FE4QJ`}
              layout="fill"
              priority
            />
          </div>
          <div className="relative w-full h-fit flex flex-col gap-4 items-center justify-center">
            <div className="relative w-[55vw] h-[35vh] xl:w-[35vw] xl:h-[35vh] items-center justify-center flex border-dorado rounded-md border-2">
              <Image
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/QmehJ5XtHxAv9zvfHBLs1rG7SS3zaAKaptDQC15dmKXvDD`}
                layout="fill"
                className="rounded-md"
              />
            </div>
            <div className="relative w-full h-fit flex items-center justify-center gap-2 flex-col font-arc text-white text-xs">
              <div className="relative w-fit h-fit flex items-center justify-center">
                {t("auth")}
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-md cursor-pointer active:scale-95 px-1.5 py-1">
                {t("mint")}
              </div>
            </div>
            <div className="relative w-full h-fit flex items-center justify-center gap-3 flex-row">
              {[
                "QmbsEYaoULeg7TXkmiMFHtA2dDkqXYHzfoYsfoLrYM4r24",
                "QmQgEq3EWgVEJZWch8KYMRKFxtZ4vLJCUwApNxjjJ7sQnw",
                "QmY4H3tPERwPW6WHnV7iycDt7X5JaTxKALrmj17zVKeAJr",
              ].map((imagen: string, indice: number) => {
                return (
                  <div
                    key={indice}
                    className="relative xl:w-[10vw] w-[15vw] xl:h-[8vh] h-[12vh] flex items-center justify-center border-dorado rounded-md border-2"
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

            <div></div>
          </div>
        </div>
      );
  }
}

export default Process;
