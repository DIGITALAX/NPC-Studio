import Image from "next/legacy/image";
import { ACCEPTED_TOKENS_AMOY, INFURA_GATEWAY } from "../../../lib/constants";
import { AutographType, Coleccion, ProcessProps } from "../types/game.types";
import { AiOutlineLoading } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

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
  colecciones,
  setColeccionActual,
  coleccionActual,
  manejarArchivo,
  manejarAhorar,
  setColecciones,
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
            <div className="relative w-[80vw] sm:w-[55vw] h-[35vh] xl:w-[35vw] xl:h-[35vh] items-center justify-center flex border-dorado rounded-sm border-2">
              <Image
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/QmehJ5XtHxAv9zvfHBLs1rG7SS3zaAKaptDQC15dmKXvDD`}
                layout="fill"
                className="rounded-sm"
              />
            </div>
            <div className="relative w-full h-fit flex items-center justify-center gap-2 flex-col font-arc text-white text-xs">
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict.Home.auth}
              </div>
              <div
                className="relative w-fit h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-sm cursor-pointer active:scale-95 px-1.5 py-1"
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
                    className="relative xl:w-[10vw] w-[25vw] sm:w-[15vw] xl:h-[8vh] h-[7vh] sm:h-[12vh] flex items-center justify-center border-dorado rounded-sm border-2"
                  >
                    <Image
                      draggable={false}
                      src={`${INFURA_GATEWAY}/ipfs/${imagen}`}
                      className="rounded-sm"
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
          <div className="relative w-full h-full flex flex-col gap-4 items-start justify-start text-white font-vcr p-32">
            <div className="relative w-full h-fit flex items-start justify-between text-xl flex-row gap-3">
              <div className="relative w-fit h-fit flex items-start justify-start">
                {dict.Home.gCreate}
              </div>
              <div className="relative w-fit h-fit flex flex-row gap-2 items-start justify-end">
                <div
                  className="relative w-fit h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                  onClick={() => !mintCargando && manejarAhorar()}
                >
                  {!mintCargando ? (
                    "Ahore Colección"
                  ) : (
                    <AiOutlineLoading size={15} color="white" />
                  )}
                </div>
                <div
                  className="relative w-fit h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                  onClick={() => !mintCargando && manejarMintear()}
                >
                  {!mintCargando ? (
                    dict.Home.gMint
                  ) : (
                    <AiOutlineLoading size={15} color="white" />
                  )}
                </div>
              </div>
            </div>
            <div className="relative w-full h-fit flex items-start justify-start flex-row gap-8">
              <div className="relative w-fit h-full flex items-center justify-between flex-col gap-6 text-sm px-3">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.gCol}
                </div>
                <div className="relative w-full h-72 flex items-start justify-start overflow-y-scroll py-3">
                  <div className="relative w-full h-fit flex items-center justify-start gap-2 flex-col">
                    {colecciones?.map((elemento: Coleccion, indice) => {
                      return (
                        <div
                          key={indice}
                          className="relative w-3/4 h-20 flex items-center justify-center cursor-pointer hover:opacity-70 rounded-sm border border-white"
                        >
                          <Image
                            draggable={false}
                            layout="fill"
                            src={elemento.imagen}
                            objectFit="cover"
                            onClick={() => setColeccionActual(elemento)}
                          />
                          <div
                            className="absolute rounded-full w-fit h-fit border border-white bg-black cursor-pointer hover:opacity-80 -top-2 z-10 -right-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              setColecciones((prev) =>
                                prev.filter(
                                  (el) =>
                                    JSON.stringify(el) !==
                                    JSON.stringify(elemento)
                                )
                              );
                            }}
                          >
                            <RxCrossCircled color="white" size={15} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="relative w-fit h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                  onClick={() =>
                    !mintCargando &&
                    setColeccionActual({
                      imagen: "",
                      cantidad: 1,
                      tokenes: [],
                      precio: 0,
                      tipo: AutographType.NFT,
                      titulo: "",
                      descripcion: "",
                      etiquetas: "",
                      npcIdiomas: "",
                      npcInstrucciones: "",
                      npcs: "",
                    })
                  }
                >
                  {dict.Home.new}
                </div>
              </div>
              <div className="relative w-fit h-full flex items-start justify-start flex-row gap-4">
                <div className="relative w-fit h-full flex items-center justify-start flex-col gap-4">
                  <div className="flex flex-col items-start justify-start w-fit h-fit gap-1 font-aust text-white">
                    <div className="relative w-fit h-fit text-sm">
                      {dict.Home.tit}
                    </div>
                    <input
                      className="relative rounded-sm p-1 bg-black text-xs border border-white h-10 w-52"
                      value={coleccionActual?.titulo}
                      onChange={(e) =>
                        setColeccionActual((prev) => ({
                          ...prev,
                          titulo: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <label
                    className="relative border border-white w-52 h-56 rounded-sm cursor-pointer p-px"
                    id="pfp"
                  >
                    <div className="relative w-full h-full flex items-center justify-center rounded-sm">
                      {coleccionActual?.imagen && (
                        <Image
                          layout="fill"
                          src={coleccionActual?.imagen}
                          objectFit="cover"
                          draggable={false}
                          className="relative rounded-sm w-full h-full flex"
                        />
                      )}
                      <input
                        hidden
                        type="file"
                        accept={"image/png, image/gif"}
                        multiple={false}
                        onChange={(e) =>
                          e?.target?.files?.[0] && manejarArchivo(e)
                        }
                      />
                    </div>
                  </label>
                  <div className="relative w-full h-fit flex flex-col items-start justify-start gap-1">
                    <div className="relative w-fit h-fit flex text-white font-aust text-sm">
                      {dict.Home.amount}
                    </div>
                    <input
                      type="number"
                      value={coleccionActual?.cantidad}
                      onChange={(e) =>
                        setColeccionActual((prev) => ({
                          ...prev,
                          cantidad: Number(e.target.value),
                        }))
                      }
                      className="relative rounded-sm p-1 bg-black text-xs border border-white h-10 w-52 max-w-[15rem]"
                      style={{
                        resize: "none",
                      }}
                    />
                  </div>
                </div>
                <div className="relative flex flex-col items-start justify-start gap-4">
                  <div className="relative w-full h-fit flex flex-col items-start justify-start gap-1">
                    <div className="relative w-fit h-fit text-sm break-words">
                      {dict.Home.des}
                    </div>
                    <textarea
                      value={coleccionActual?.descripcion || ""}
                      onChange={(e) =>
                        setColeccionActual((prev) => ({
                          ...prev,
                          descripcion: e.target.value,
                        }))
                      }
                      className="relative rounded-sm p-1 bg-black text-xs border border-white h-40 w-52 break-all"
                      style={{
                        resize: "none",
                      }}
                    ></textarea>
                  </div>
                  <div className="relative w-full h-fit flex flex-col items-start justify-start gap-1">
                    <div className="relative w-fit h-fit flex text-white font-aust text-sm">
                      {dict.Home.price} {`( USD )`}
                    </div>
                    <input
                      type="number"
                      value={coleccionActual?.precio}
                      onChange={(e) =>
                        setColeccionActual((prev) => ({
                          ...prev,
                          precio: Number(e.target.value),
                        }))
                      }
                      className="relative rounded-sm p-1 bg-black text-xs border border-white h-10 w-52 max-w-[15rem]"
                      style={{
                        resize: "none",
                      }}
                    />
                  </div>
                  <div className="relative w-full h-fit flex flex-col items-start justify-start gap-1">
                    <div className="relative w-fit h-fit flex text-white font-aust text-sm">
                      {dict.Home.tokens}
                    </div>
                    <div className="relative flex flex-row flex-wrap items-start justify-start gap-5 w-full h-fit">
                      {ACCEPTED_TOKENS_AMOY?.map(
                        (elemento: string[], indice: number) => {
                          return (
                            <div
                              className={`relative w-fit h-fit rounded-full flex items-center cursor-pointer active:scale-95 ${
                                coleccionActual?.tokenes?.includes(
                                  elemento[2] as `0x${string}`
                                )
                                  ? "opacity-100"
                                  : "opacity-50"
                              }`}
                              key={indice}
                              onClick={() => {
                                setColeccionActual((prev) => {
                                  const newAcceptedTokens =
                                    prev?.tokenes?.includes(
                                      elemento[2] as `0x${string}`
                                    )
                                      ? prev.tokenes.filter(
                                          (token) => token !== elemento[2]
                                        )
                                      : [...(prev?.tokenes || []), elemento[2]];

                                  return {
                                    ...prev,
                                    acceptedTokens: newAcceptedTokens,
                                  };
                                });
                              }}
                            >
                              <Image
                                src={`${INFURA_GATEWAY}/ipfs/${elemento[0]}`}
                                className="flex rounded-full"
                                draggable={false}
                                width={30}
                                height={35}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col items-start justify-start gap-4">
                  <div className="flex flex-col items-start justify-start w-fit h-fit gap-1 relative">
                    <div className="relative w-fit h-fit text-sm break-words">
                      {dict.Home.tags}
                    </div>
                    <input
                      value={coleccionActual?.etiquetas}
                      onChange={(e) =>
                        setColeccionActual((prev) => ({
                          ...prev,
                          etiquetas: e.target.value,
                        }))
                      }
                      className="relative rounded-sm p-1 bg-black text-xs border border-white h-10 w-52 max-w-[15rem]"
                      style={{
                        resize: "none",
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-fit h-fit gap-1 relative">
                    <div className="relative w-fit h-fit text-sm break-words">
                      NPCs
                    </div>
                    <input
                      value={coleccionActual?.npcs}
                      onChange={(e) =>
                        setColeccionActual((prev) => ({
                          ...prev,
                          npcs: e.target.value,
                        }))
                      }
                      className="relative rounded-sm p-1 bg-black text-xs border border-white h-10 w-52 max-w-[15rem]"
                      style={{
                        resize: "none",
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-fit h-fit gap-1 relative">
                    <div className="relative w-fit h-fit text-sm break-words">
                      {dict.Home.npcL}
                    </div>
                    <input
                      value={coleccionActual?.npcIdiomas}
                      onChange={(e) =>
                        setColeccionActual((prev) => ({
                          ...prev,
                          npcIdiomas: e.target.value,
                        }))
                      }
                      className="relative rounded-sm p-1 bg-black text-xs border border-white h-10 w-52 max-w-[15rem]"
                      style={{
                        resize: "none",
                      }}
                    />
                  </div>
                  <div
                    className="relative w-fit h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                    onClick={() => {
                      setColecciones((prev) => [...prev, coleccionActual]);
                      setColeccionActual({
                        imagen: "",
                        cantidad: 1,
                        tokenes: [],
                        precio: 0,
                        tipo: AutographType.NFT,
                        titulo: "",
                        descripcion: "",
                        etiquetas: "",
                        npcIdiomas: "",
                        npcInstrucciones: "",
                        npcs: "",
                      });
                    }}
                  >
                    {dict.Home.add}
                  </div>
                </div>
              </div>
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
                className="relative w-32 h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 text-xs"
                onClick={() => setMint(3)}
              >
                {!mintCargando ? (
                  dict.Home.again
                ) : (
                  <AiOutlineLoading size={15} color="white" />
                )}
              </div>
              <div
                className="relative w-32 h-fit flex items-center justify-center bg-offNegro border border-dorado rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
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
