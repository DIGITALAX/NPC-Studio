import { ChangeEvent, FunctionComponent, JSX, useContext } from "react";
import { MintProps } from "../types/mint.types";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS, INFURA_GATEWAY, INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import { AutographType, Coleccion } from "../../Common/types/common.types";
import { ModalContext } from "@/app/providers";
import { useAccount } from "wagmi";
import { Notificacion } from "../../Modals/types/modals.types";
import { useModal } from "connectkit";
import useMint from "../hooks/useMint";
import { createPublicClient, http } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import DropDown from "./DropDown";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

const Mint: FunctionComponent<MintProps> = ({ dict }): JSX.Element => {
  const { isConnected } = useAccount();
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const contexto = useContext(ModalContext);
  const { openProfile } = useModal();
  const {
    manejarMintear,
    mintCargando,
    manejarArchivo,
    colecciones,
    setColecciones,
    dropDown,
    setDropDown,
    mostrarGalerias,
    setMostrarGalerias,
    cargandoGalerias,
    todasLasGalerias,
    borrarColeccion,
    borrarGaleria,
    cargandoBorrar,
    indiceImagen,
    setIndiceImagen,
  } = useMint(publicClient);
  switch (contexto?.mint) {
    case 1:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY_INTERNAL}QmanpFJZmunhedHndu398hbgkB1z48EH1iX3gK5nVZnoaC`}
            draggable={false}
            layout="fill"
            priority
          />
          <div
            className="flex justify-end bottom-2 right-0 absolute items-end cursor-pointer w-28 h-6"
            onClick={() => contexto?.setMint(2)}
          ></div>
        </div>
      );

    case 2:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute h-full w-full flex items-center justify-center">
            <Image
              draggable={false}
              src={`${INFURA_GATEWAY_INTERNAL}QmR3LnrzJT7N33hTsdHtALAq23uKXi41Ru96CSi64FE4QJ`}
              layout="fill"
              priority
            />
          </div>
          <div className="relative w-[70%] h-[80%] py-6 flex flex-col gap-4 items-center justify-center">
            <div className="relative w-[80vw] sm:w-[55vw] h-full xl:w-[35vw] items-center justify-center flex border-dorado rounded-sm border-2">
              <Image
                draggable={false}
                src={`${INFURA_GATEWAY_INTERNAL}QmehJ5XtHxAv9zvfHBLs1rG7SS3zaAKaptDQC15dmKXvDD`}
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
                onClick={() =>
                  contexto?.esArtista
                    ? contexto?.setMint(3)
                    : isConnected
                    ? contexto?.setMostrarNotificacion(Notificacion.Diseñador)
                    : openProfile()
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
                    className="relative xl:w-[10vw] w-[30vw] sm:w-[25vw] sm:w-[15vw] xl:h-[8vh] h-[7vh] sm:h-[12vh] flex items-center justify-center border-dorado rounded-sm border-2"
                  >
                    <Image
                      draggable={false}
                      src={`${INFURA_GATEWAY_INTERNAL}${imagen}`}
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
              src={`${INFURA_GATEWAY_INTERNAL}QmR3LnrzJT7N33hTsdHtALAq23uKXi41Ru96CSi64FE4QJ`}
              layout="fill"
              priority
            />
          </div>
          <div className="relative w-full h-full items-start justify-start text-white font-bit px-32 pt-24 pb-32">
            <div className="relative w-full h-full flex items-start justify-start flex flex-col gap-4 overflow-y-scroll">
              {mostrarGalerias ? (
                <div className="relative w-full h-fit flex items-start justify-between text-xl flex-col gap-5 overflow-y-scroll">
                  <div className="relative w-fit h-fit flex flex-row gap-2 items-start justify-end">
                    <div
                      className="relative w-fit h-fit flex items-center justify-center bg-morado border border-white  rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                      onClick={() => setMostrarGalerias(false)}
                    >
                      {dict.Home.back}
                    </div>
                  </div>
                  <div className="relative w-fit h-fit flex items-start justify-start gap-4 flex-wrap">
                    {cargandoGalerias
                      ? Array.from({ length: 10 })?.map((_, indice: number) => {
                          return (
                            <div
                              key={indice}
                              className="relative w-60 h-52 border border-brillo rounded-sm flex items-center bg-offNegro justify-center cursor-pointer hover:opacity-80 bg-black/60 animate-pulse"
                            ></div>
                          );
                        })
                      : todasLasGalerias?.map((gal, indice: number) => {
                       
                          return (
                            <div
                              key={indice}
                              className="relative w-60 h-52 border border-brillo rounded-sm flex items-center justify-center cursor-pointer bg-offNegro hover:opacity-80"
                              onClick={() => {
                                setColecciones(gal.colecciones);
                                setIndiceImagen(0);
                                contexto?.setGaleriaActual({
                                  title: gal?.metadata?.title,
                                  image: gal?.metadata?.image,
                                });
                                contexto?.setColeccionActual({
                                  cantidad: 1,
                                  tokenes: [],
                                  precio: 0,
                                  id: gal.colecciones.length + 1,
                                  tipo: "NFT" as any,
                                  titulo: "",
                                  descripcion: "",
                                  etiquetas: "",
                                  npcs: "",
                                  imagenes: Array.from({ length: 3 }, () => ""),
                                  tokenesMinteados: [],
                                  profile: undefined,
                                  postIds: [],
                                });
                                setMostrarGalerias(false);
                              }}
                            >
                              <Image
                                draggable={false}
                                layout="fill"
                                objectFit="cover"
                                src={`${INFURA_GATEWAY_INTERNAL}${
                                  gal.colecciones?.[0]?.imagenes?.[0]?.split(
                                    "ipfs://"
                                  )?.[1]
                                }`}
                                className="rounded-sm"
                              />
                              {gal.colecciones.filter(
                                (col) => (col.tokenesMinteados || []).length > 0
                              ).length < 1 && (
                                <div
                                  className="absolute rounded-full w-fit h-fit border border-brillo bg-black cursor-pointer hover:opacity-80 -top-2 z-10 -right-1.5"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!cargandoBorrar[indice])
                                      borrarGaleria(
                                        Number(gal.galleryId),
                                        indice
                                      );
                                  }}
                                >
                                  <div
                                    className={`${
                                      cargandoBorrar[indice] && "animate-spin"
                                    } relative flex items-center justify-center w-fit h-fit`}
                                  >
                                    <RxCrossCircled color="white" size={25} />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative w-full h-fit flex items-start justify-between text-xl flex-row gap-3">
                    <div className="relative w-fit h-fit flex items-start justify-start">
                      {dict.Home.gCreate}
                    </div>
                    <div className="relative w-fit h-fit flex flex-row gap-2 items-start justify-end flex-wrap">
                      <div
                        className="relative w-fit h-fit flex items-center justify-center bg-morado border border-white rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                        onClick={() => setMostrarGalerias(true)}
                      >
                        {dict.Home.all}
                      </div>
                      {colecciones.filter((col) => col.galeriaId).length >
                        0 && (
                        <div
                          className="relative w-fit h-fit flex items-center justify-center bg-morado border border-white  rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                          onClick={() => {
                            if (!mintCargando) {
                              setColecciones([]);
                              setDropDown({
                                npcsAbiertos: false,
                                tiposAbiertos: false,
                                npcsTexto: "",
                              });
                              setIndiceImagen(0);
                              contexto?.setColeccionActual({
                                cantidad: 1,
                                tokenes: [],
                                precio: 0,
                                id: colecciones.length + 1,
                                tipo: "NFT" as any,
                                titulo: "",
                                descripcion: "",
                                etiquetas: "",
                                npcs: "",
                                tokenesMinteados: [],
                                profile: undefined,
                                postIds: [],
                                imagenes: Array.from({ length: 3 }, () => ""),
                              });
                            }
                          }}
                        >
                          {dict.Home.gNew}
                        </div>
                      )}
                      <div
                        className={`relative w-36 h-fit flex items-center justify-center bg-morado border border-white rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs`}
                        onClick={() => !mintCargando && manejarMintear()}
                      >
                        {!mintCargando ? (
                          colecciones.filter((col) => col.galeriaId).length >
                          0 ? (
                            dict.Home.gUpdate
                          ) : (
                            dict.Home.gMint
                          )
                        ) : (
                          <div
                            className={`relative w-fit h-fit flex items-center justify-center animate-spin`}
                          >
                            <AiOutlineLoading size={15} color="white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-fit flex items-start justify-start gap-3 flex-row px-3">
                    <label className="relative w-fit h-fit flex">
                      <div className="relative border border-brillo bg-black w-10 h-10 flex items-center justify-center rounded-sm cursor-pointer">
                        <Image
                          layout="fill"
                          key={contexto?.galeriaActual?.image}
                          src={
                            contexto?.galeriaActual?.image?.includes("ipfs://")
                              ? `${INFURA_GATEWAY}/ipfs/${
                                  contexto?.galeriaActual?.image?.split(
                                    "ipfs://"
                                  )?.[1]
                                }`
                              : contexto?.galeriaActual?.image ?? ""
                          }
                          objectFit="cover"
                          draggable={false}
                          className="relative rounded-sm w-full h-full flex"
                        />
                        <input
                          hidden
                          disabled={
                            contexto?.coleccionActual?.galeriaId ? true : false
                          }
                          type="file"
                          accept={"image/png, image/gif"}
                          multiple={false}
                          onChange={(e) =>
                            e?.target?.files?.[0] && manejarArchivo(e, 0, true)
                          }
                        />
                      </div>
                    </label>
                    <div className="relative w-fit h-fit flex">
                      <input
                        className="relative rounded-sm p-1 bg-black text-xs border border-brillo h-10 w-52"
                        placeholder={dict.Home.gTitulo}
                        disabled={
                          contexto?.coleccionActual?.galeriaId ? true : false
                        }
                        value={contexto?.galeriaActual?.title}
                        onChange={(e) => {
                          contexto?.setGaleriaActual((prev) => ({
                            image: prev?.image as string,
                            title: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="relative w-full h-fit flex items-start justify-start flex-row gap-8">
                    <div className="relative w-fit h-full flex items-center justify-start flex-col gap-6 text-xxs px-3">
                      <div className="relative w-fit h-fit flex items-center justify-center">
                        {dict.Home.gCol}
                      </div>
                      <div className="relative w-full h-[16rem] max-h-full flex items-start justify-start overflow-y-scroll py-3">
                        <div className="relative w-full h-fit flex items-center justify-start gap-2 flex-col pr-2">
                          {colecciones?.map((elemento: Coleccion, indice) => {
                            return (
                              <div
                                key={indice}
                                className="relative w-fit h-fit flex items-center justify-center cursor-pointer hover:opacity-70 rounded-sm border border-brillo"
                              >
                                <div className="relative w-28 h-20 flex items-center justify-center">
                                  <Image
                                    draggable={false}
                                    layout="fill"
                                    src={
                                      elemento?.imagenes?.[0]?.includes(
                                        "ipfs://"
                                      )
                                        ? `${INFURA_GATEWAY}/ipfs/${
                                            elemento?.imagenes?.[0]?.split(
                                              "ipfs://"
                                            )?.[1]
                                          }`
                                        : elemento?.imagenes?.[0]
                                    }
                                    objectFit="cover"
                                    className="rounded-sm"
                                    onClick={() => {
                                      contexto?.setColeccionActual(elemento);
                                      setDropDown({
                                        npcsAbiertos: false,
                                        tiposAbiertos: false,
                                        npcsTexto: elemento.npcs,
                                      });
                                    }}
                                  />
                                  {!elemento?.galeriaId && (
                                    <div
                                      className="absolute rounded-full w-fit h-fit border border-brillo bg-black cursor-pointer hover:opacity-80 -top-2 z-10 -right-1.5"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (!elemento?.galeriaId) {
                                          contexto?.setColeccionActual(
                                            (prev) => ({
                                              ...prev,
                                              id: colecciones?.length - 1,
                                            })
                                          );
                                          setColecciones((prev) => {
                                            const filt = prev.filter(
                                              (el) =>
                                                JSON.stringify(el) !==
                                                JSON.stringify(elemento)
                                            );

                                            return filt
                                              .sort((a, b) => Number(a.id) - Number(b.id))
                                              .map((col, ind) => ({
                                                ...col,
                                                id: ind,
                                              }));
                                          });
                                        }
                                      }}
                                    >
                                      <RxCrossCircled color="white" size={15} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className="relative w-full h-fit flex items-center justify-center bg-morado border border-white rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs whitespace-nowrap"
                        onClick={() => {
                          if (!mintCargando) {
                            setIndiceImagen(0);
                            contexto?.setColeccionActual({
                              cantidad: 1,
                              tokenes: [],
                              precio: 0,
                              id: colecciones.length + 1,
                              tipo: "NFT" as any,
                              titulo: "",
                              descripcion: "",
                              etiquetas: "",
                              imagenes: Array.from({ length: 3 }, () => ""),
                              npcs: "",
                              tokenesMinteados: [],
                              profile: undefined,
                              postIds: [],
                            });
                          }
                          setDropDown({
                            npcsAbiertos: false,
                            tiposAbiertos: false,
                            npcsTexto: "",
                          });
                        }}
                      >
                        {dict.Home.new}
                      </div>
                    </div>
                    <div className="relative w-fit h-fit flex items-start justify-start flex-row gap-4 flex-wrap">
                      <div className="relative w-fit h-full flex items-center justify-start flex-col gap-4">
                        <div className="flex flex-col items-start justify-start w-fit h-fit gap-1 font-aust text-white">
                          <div className="relative w-fit h-fit text-sm">
                            {dict.Home.tit}
                          </div>
                          <input
                            className="relative rounded-sm p-1 bg-black text-xs border border-brillo h-10 w-52"
                            value={contexto?.coleccionActual?.titulo}
                            disabled={
                              contexto?.coleccionActual?.galeriaId
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              contexto?.setColeccionActual((prev) => ({
                                ...prev,
                                titulo: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <label className="relative border border-brillo w-52 h-56 rounded-sm cursor-pointer p-px">
                          <div className="relative w-full h-full flex items-center justify-center rounded-sm">
                            <Image
                              layout="fill"
                              key={
                                contexto?.coleccionActual?.imagenes?.[
                                  indiceImagen - 1 < 0 ? 0 : indiceImagen - 1
                                ]
                              }
                              src={
                                contexto?.coleccionActual?.imagenes?.[
                                  indiceImagen - 1 < 0 ? 0 : indiceImagen - 1
                                ]?.includes("ipfs://")
                                  ? `${INFURA_GATEWAY}/ipfs/${
                                      contexto?.coleccionActual?.imagenes?.[
                                        indiceImagen - 1 < 0
                                          ? 0
                                          : indiceImagen - 1
                                      ]?.split("ipfs://")?.[1]
                                    }`
                                  : contexto?.coleccionActual?.imagenes?.[
                                      indiceImagen - 1 < 0
                                        ? 0
                                        : indiceImagen - 1
                                    ]
                              }
                              objectFit="cover"
                              draggable={false}
                              className="relative rounded-sm w-full h-full flex"
                            />

                            <input
                              hidden
                              disabled={
                                contexto?.coleccionActual?.galeriaId
                                  ? true
                                  : false
                              }
                              type="file"
                              accept={"image/png, image/gif"}
                              multiple={false}
                              onChange={(e) =>
                                e?.target?.files?.[0] &&
                                manejarArchivo(
                                  e,
                                  contexto?.coleccionActual?.tipo !==
                                    AutographType.NFT
                                    ? indiceImagen - 1
                                    : 0
                                )
                              }
                            />
                            {contexto?.coleccionActual?.tipo !==
                              AutographType.NFT && (
                              <div className="absolute w-full hit left-0 bottom-2 items-center justify-center flex flex-row gap-2">
                                <div
                                  className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95 rounded-full bg-black border-white"
                                  onClick={(e) => {
                                    e.stopPropagation;
                                    e.preventDefault();
                                    setIndiceImagen(
                                      indiceImagen > 0 ? indiceImagen - 1 : 3
                                    );
                                  }}
                                >
                                  <FaArrowAltCircleLeft
                                    size={20}
                                    color="white"
                                  />
                                </div>
                                <div
                                  className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95 rounded-full bg-black border-white"
                                  onClick={(e) => {
                                    e.stopPropagation;
                                    e.preventDefault();
                                    setIndiceImagen(
                                      indiceImagen < 3 ? indiceImagen + 1 : 0
                                    );
                                  }}
                                >
                                  <FaArrowAltCircleRight
                                    size={20}
                                    color="white"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </label>
                        <div className="relative w-full h-fit flex flex-col items-start justify-start gap-1">
                          <div className="relative w-fit h-fit flex text-white font-aust text-sm">
                            {dict.Home.amount}
                          </div>
                          <input
                            type="number"
                            disabled={
                              contexto?.coleccionActual?.galeriaId
                                ? true
                                : false
                            }
                            value={contexto?.coleccionActual?.cantidad}
                            onChange={(e) =>
                              contexto?.setColeccionActual((prev) => ({
                                ...prev,
                                cantidad: Number(e.target.value),
                              }))
                            }
                            className="relative rounded-sm p-1 bg-black text-xs border border-brillo h-10 w-52 max-w-[15rem]"
                            style={{
                              resize: "none",
                            }}
                          />
                        </div>
                      </div>
                      <div className="relative flex flex-col flex-wrap items-start justify-start gap-4 w-fit h-fit">
                        <div className="relative w-full h-fit flex flex-col items-start justify-start gap-1">
                          <div className="relative w-fit h-fit text-sm break-words">
                            {dict.Home.des}
                          </div>
                          <textarea
                            disabled={
                              contexto?.coleccionActual?.galeriaId
                                ? true
                                : false
                            }
                            value={contexto?.coleccionActual?.descripcion || ""}
                            onChange={(e) =>
                              contexto?.setColeccionActual((prev) => ({
                                ...prev,
                                descripcion: e.target.value,
                              }))
                            }
                            className="relative rounded-sm p-1 bg-black text-xs border border-brillo h-40 w-52 break-all"
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
                            disabled={
                              contexto?.coleccionActual?.galeriaId
                                ? true
                                : false
                            }
                            value={
                              contexto?.coleccionActual?.galeriaId
                                ? contexto?.coleccionActual?.precio / 10 ** 18
                                : contexto?.coleccionActual?.precio
                            }
                            onChange={(e) =>
                              contexto?.setColeccionActual((prev) => ({
                                ...prev,
                                precio: Number(e.target.value),
                              }))
                            }
                            className="relative rounded-sm p-1 bg-black text-xs border border-brillo h-10 w-52 max-w-[15rem]"
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
                            {ACCEPTED_TOKENS?.map(
                              (elemento: string[], indice: number) => {
                                return (
                                  <div
                                    className={`relative w-6 h-6 rounded-full flex items-center cursor-pointer active:scale-95 ${
                                      contexto?.coleccionActual?.tokenes?.includes(
                                        elemento[2]?.toLowerCase() as `0x${string}`
                                      )
                                        ? "opacity-100 border border-white"
                                        : "opacity-50"
                                    }`}
                                    key={indice}
                                    onClick={() => {
                                      if (
                                        !contexto?.coleccionActual?.galeriaId
                                      ) {
                                        contexto?.setColeccionActual((prev) => {
                                          return {
                                            ...prev,
                                            tokenes: prev?.tokenes?.includes(
                                              elemento[2]?.toLowerCase() as `0x${string}`
                                            )
                                              ? prev.tokenes.filter(
                                                  (token) =>
                                                    token !==
                                                    elemento[2]?.toLowerCase()
                                                )
                                              : ([
                                                  ...(prev?.tokenes || []),
                                                  elemento[2]?.toLowerCase(),
                                                ] as `0x${string}`[]),
                                          };
                                        });
                                      }
                                    }}
                                  >
                                    <Image
                                      src={`${INFURA_GATEWAY_INTERNAL}${elemento[0]}`}
                                      className="flex rounded-full"
                                      draggable={false}
                                      layout="fill"
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="relative flex flex-wrap 2xl:flex-col items-start justify-start gap-4 w-fit h-fit">
                        <div className="flex flex-col items-start justify-start w-fit h-fit gap-1 relative">
                          <div className="relative w-fit h-fit text-sm break-words">
                            {dict.Home.tags}
                          </div>
                          <input
                            value={contexto?.coleccionActual?.etiquetas}
                            disabled={
                              contexto?.coleccionActual?.galeriaId
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              contexto?.setColeccionActual((prev) => ({
                                ...prev,
                                etiquetas: e.target.value,
                              }))
                            }
                            className="relative rounded-sm p-1 bg-black text-xs border border-brillo h-10 w-52 max-w-[15rem]"
                            style={{
                              resize: "none",
                            }}
                          />
                        </div>
                        <DropDown
                          dict={dict}
                          disabled={
                            contexto?.coleccionActual?.galeriaId ? true : false
                          }
                          valores={Array.from(
                            contexto?.escenas
                              .reduce((acc, item) => {
                                item.sprites.forEach((sprite) => {
                                  if (
                                    (sprite?.etiqueta
                                      .toLowerCase()
                                      .includes(
                                        dropDown.npcsTexto
                                          ?.split(",")
                                          ?.filter(Boolean)
                                          ?.pop()
                                          ?.trim()
                                          ?.toLowerCase() || ""
                                      ) &&
                                      !contexto?.coleccionActual.npcs
                                        ?.split(",")
                                        ?.map((npc) =>
                                          npc?.trim().toLowerCase()
                                        )
                                        ?.includes(
                                          sprite?.etiqueta.toLowerCase()
                                        )) ||
                                    contexto?.escenas
                                      .map((col) => col.sprites)
                                      .filter(
                                        (sprite) =>
                                          sprite.filter(
                                            (s) =>
                                              dropDown.npcsTexto
                                                ?.split(",")
                                                ?.filter(Boolean)
                                                ?.pop()
                                                ?.trim()
                                                ?.toLowerCase() ==
                                              s?.etiqueta.toLowerCase()
                                          ).length > 0
                                      ).length > 0
                                  ) {
                                    acc.set(sprite?.etiqueta, {
                                      cover: sprite.tapa,
                                      key: sprite.etiqueta,
                                    });
                                  }
                                });
                                return acc;
                              }, new Map())
                              .values()
                          )}
                          titulo={"NPCs"}
                          valor={dropDown.npcsTexto || ""}
                          manejarCambio={(e: ChangeEvent) => {
                            const searchTerm = (
                              e.target as HTMLInputElement
                            )?.value
                              .trim()
                              .toLowerCase();
                            contexto?.setColeccionActual((prev) => ({
                              ...prev,
                              npcs: prev.npcs.split(",").join(","),
                            }));

                            setDropDown({
                              ...dropDown,
                              npcsAbiertos: true,
                              npcsTexto: searchTerm,
                            });
                          }}
                          estaAbierto={dropDown?.npcsAbiertos}
                          setEstaAbierto={() => {
                            setDropDown({
                              ...dropDown,
                              npcsAbiertos: !dropDown.npcsAbiertos,
                            });
                          }}
                          manejarElegir={(value: string) => {
                            let npcs: string;
                            const npcsArray = contexto?.coleccionActual.npcs
                              ? contexto?.coleccionActual.npcs
                                  .split(",")
                                  .filter(Boolean)
                              : [];
                            if (npcsArray.includes(value)) {
                              npcs = npcsArray
                                .filter((npc) => npc !== value)
                                .join(",");
                            } else {
                              npcs = [...(npcsArray || []), value].join(",");
                            }

                            contexto?.setColeccionActual((prev) => ({
                              ...prev,
                              npcs,
                            }));

                            setDropDown((prev) => ({
                              ...prev,
                              npcsTexto: npcs,
                            }));
                          }}
                        />

                        <DropDown
                          dict={dict}
                          disabled={
                            contexto?.coleccionActual?.galeriaId ? true : false
                          }
                          valores={Array.from(
                            Object.values(AutographType)
                              .map((item, indice) => ({
                                key: item.toString(),
                                cover:
                                  indice === 0
                                    ? "QmUADJfzGsFgp9n4XUZD66inxTCijJ9fwMXeUkjuKjHVzs"
                                    : indice === 1
                                    ? "QmRMWKP63xaJQsspfnLL9Fhou484LEb2VbTWFyfYsJ1aep"
                                    : indice === 2
                                    ? "QmVbePRht5te5J9JzGGrnMocPZkSWnqGPEaNMZTSjFoYDr"
                                    : "",
                              }))
                              .filter((item) => item.cover !== "")
                          )}
                          titulo={dict.Home.tipo}
                          valor={
                            contexto?.coleccionActual.tipo.toString() || ""
                          }
                          manejarElegir={(value: string) => {
                            contexto?.setColeccionActual((prev) => ({
                              ...prev,
                              tipo: value as any,
                            }));
                          }}
                          estaAbierto={dropDown?.tiposAbiertos}
                          setEstaAbierto={() => {
                            setDropDown({
                              ...dropDown,
                              tiposAbiertos: !dropDown.tiposAbiertos,
                            });
                          }}
                        />
                        <div className="relative w-fit h-fit flex flex-row gap-3">
                          <div
                            className="relative w-32 h-8 flex items-center justify-center bg-oscuro border border-white rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                            onClick={() => {
                              if (contexto?.coleccionActual?.galeriaId) {
                                if (
                                  colecciones?.filter(
                                    (col) =>
                                      (col.tokenesMinteados || []).length > 0
                                  ).length < 1
                                ) {
                                  borrarColeccion();
                                }
                              } else {
                                setColecciones((prev) => {
                                  const exists = prev.some(
                                    (item) =>
                                      item.id === contexto?.coleccionActual.id
                                  );
                                  if (exists) {
                                    return prev.map((item) =>
                                      item.id === contexto?.coleccionActual.id
                                        ? contexto?.coleccionActual
                                        : item
                                    );
                                  } else {
                                    return [...prev, contexto?.coleccionActual];
                                  }
                                });

                                setDropDown({
                                  npcsAbiertos: false,
                                  npcsTexto: "",
                                  tiposAbiertos: false,
                                });
                                setIndiceImagen(0);
                                contexto?.setColeccionActual({
                                  cantidad: 1,
                                  tokenes: [],
                                  precio: 0,
                                  id: colecciones.length + 1,
                                  tipo: "NFT" as any,
                                  titulo: "",
                                  descripcion: "",
                                  etiquetas: "",
                                  npcs: "",
                                  tokenesMinteados: [],
                                  profile: undefined,
                                  postIds: [],
                                  imagenes: Array.from({ length: 3 }, () => ""),
                                });
                              }
                            }}
                          >
                            {cargandoBorrar[0] ? (
                              <div
                                className={`animate-spin relative relative flex items-center justify-center w-fit h-fit`}
                              >
                                <AiOutlineLoading color="white" size={15} />
                              </div>
                            ) : contexto?.coleccionActual?.galeriaId ? (
                              dict.Home.delete
                            ) : (
                              dict.Home.add
                            )}
                          </div>
                          {contexto?.coleccionActual?.galeriaId && (
                            <div
                              className="relative w-24 h-8 flex items-center justify-center bg-morado border border-white rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                              onClick={() => contexto?.setConectarPub(true)}
                            >
                              {dict.Home.pub}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
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
              src={`${INFURA_GATEWAY_INTERNAL}QmR3LnrzJT7N33hTsdHtALAq23uKXi41Ru96CSi64FE4QJ`}
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
                className="relative w-32 h-fit flex items-center justify-center bg-morado border border-white rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 text-xs"
                onClick={() => contexto?.setMint(3)}
              >
                {!mintCargando ? (
                  dict.Home.again
                ) : (
                  <AiOutlineLoading size={15} color="white" />
                )}
              </div>
              <div
                className="relative w-32 h-fit flex items-center justify-center bg-morado border border-white rounded-sm cursor-pointer active:scale-95 px-1.5 py-1 font-arc text-white text-xs"
                onClick={() => contexto?.setMint(1)}
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

    default:
      return <></>;
  }
};

export default Mint;
