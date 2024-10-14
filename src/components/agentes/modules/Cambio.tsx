import { FunctionComponent } from "react";
import Agentes from "./Agentes";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import Puntaje from "./Puntaje";
import { CambioProps, Pantalla } from "../types/agentes.types";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import { AiOutlineLoading } from "react-icons/ai";
import Seleccion from "./Seleccion";
import moment from "moment";
import Petalos from "./Petalos";
import { Profile } from "../../../../graphql/generated";

const Cambio: FunctionComponent<CambioProps> = ({
  pantallaCambio,
  lang,
  dict,
  todosLosNPCs,
  router,
  setMostrarMas,
  mostrarMas,
  npcsCargando,
  informacion,
  escenas,
  espectadorInfo,
  manejarLens,
  manejarSalir,
  openConnectModal,
  isConnected,
  lensCargando,
  lensConectado,
  manejarCoger,
  cogerCargando,
  tokensGuardados,
  desafiantes,
  setDesafiantes,
  todosLosDesafiantes,
  tabla,
}): JSX.Element => {
  switch (pantallaCambio) {
    case Pantalla.Desafiante:
      const des0 = createProfilePicture(
        desafiantes?.[0]?.perfil?.metadata?.picture
      );
      const des1 = createProfilePicture(
        desafiantes?.[1]?.perfil?.metadata?.picture
      );
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start overflow-x-hidden text-[100vw] ${
              lang == "en" ? "text-[8vw]" : "text-[6vw]"
            }`}
          >
            {dict.Home.chall}
          </div>
          <div className="relative w-full h-fit flex items-center justify-center flex-col lg:flex-row gap-6 xl:gap-14">
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
                        (npcsCargando || todosLosNPCs?.length < 1) &&
                        "animate-pulse"
                      }`}
                    />
                  </div>
                  {todosLosNPCs?.length > 0 && (
                    <>
                      <div className="relative w-full h-fit flex flex-row items-center justify-between gap-3 bg-black/40 p-1 rounded-md">
                        <div className="relative flex flex-row w-full h-full text-white font-aust items-center justify-start gap-2">
                          <div
                            className={`relative rounded-full flex bg-black w-6 h-6 items-center justify-center`}
                            id="pfp"
                          >
                            {des0 && (
                              <Image
                                src={des0}
                                objectFit="cover"
                                alt="pfp"
                                layout="fill"
                                className="relative w-fit h-fit rounded-full items-center justify-center flex"
                                draggable={false}
                              />
                            )}
                          </div>
                          <div className="relative items-center justify-center w-fit h-fit text-xs flex break-all">
                            {
                              desafiantes?.[0]?.perfil?.handle
                                ?.suggestedFormatted?.localName
                            }
                          </div>
                        </div>
                        <div className="relative w-full h-fit flex items-center justify-end">
                          <div
                            className="relative w-24 text-xs font-bit text-viol h-8 flex items-center justify-center cursor-pointer hover:opacity-70"
                            onClick={() =>
                              router.push(
                                `/npc/${desafiantes?.[0]?.perfil?.handle?.suggestedFormatted?.localName}`
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
                            src={`${INFURA_GATEWAY}/ipfs/${desafiantes?.[0]?.tapa_dos}`}
                            layout="fill"
                            objectFit="contain"
                            draggable={false}
                          />
                        </div>
                        <div className="realtive w-full h-fit bg-black/80 p-2 flex flex-col items-center justify-between gap-2 text-xxs font-super text-sol">
                          <div className="relative w-full h-px flex items-start justify-start bg-azulito"></div>
                          <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {dict.Home.auEarned}
                            </div>
                            <div className="relative w-fit h-fit flex items-center justify-center text-xxxs">
                              {desafiantes?.[0]?.auEarnedTotal || 0} $AU
                            </div>
                          </div>
                          <div className="relative w-full h-px flex items-start justify-start bg-[#FF4EFF]"></div>
                          <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {dict.Home.activeJobs}
                            </div>
                            <div className="relative w-fit text-xxxs h-fit flex items-center justify-center">
                              {desafiantes?.[0]?.activeJobs || 0}
                            </div>
                          </div>
                          <div className="relative w-full h-px flex items-start justify-start bg-[#F6FC8D]"></div>
                          <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {dict.Home.currentScore}
                            </div>
                            <div className="relative w-fit h-fit text-xxxs flex items-center justify-center">
                              {desafiantes?.[0]?.currentGlobalScore || 0}
                            </div>
                          </div>
                          <div className="relative w-full h-px flex items-start justify-start bg-[#65B0FF]"></div>
                          <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {dict.Home.rentPaid}
                            </div>
                            <div className="relative w-fit text-xxxs h-fit flex items-center justify-center">
                              {desafiantes?.[0]?.auPaidTotal || 0} $AU
                            </div>
                          </div>
                          <div className="relative w-full h-px flex items-start justify-start bg-[#09FF6B]"></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {todosLosNPCs?.length > 0 && (
                <Seleccion
                  desafiantes={desafiantes}
                  setDesafiantes={setDesafiantes}
                  todosLosDesafiantes={todosLosDesafiantes}
                  indice={0}
                />
              )}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div className="relative flex w-20 h-20 items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmXLzPsvnzcEnLgBWpkVFSCbG3gKUU2Sfewi6JoNzmvrTs`}
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                />
              </div>
            </div>
            <div
              className={`relative w-full gal:w-60 xl:w-80 h-fit flex items-center justify-between flex-col gap-3`}
            >
              <div className="relative w-full h-fit flex items-center justify-center">
                <div
                  className={`relative w-full h-96 flex items-stretch justify-start flex-col gap-4 p-5`}
                >
                  <div className={`absolute top-0 left-0 w-full h-full flex`}>
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/QmXBVuPh7ZAC6wsPRNiGAwFuWzm1XGjQprD6wYYtk2XzAh`}
                      layout="fill"
                      objectFit="fill"
                      draggable={false}
                      className={` ${
                        (npcsCargando || todosLosNPCs?.length < 1) &&
                        "animate-pulse"
                      }`}
                    />
                  </div>
                  {todosLosNPCs?.length > 0 && (
                    <>
                      <div className="relative w-full h-fit flex flex-row items-center justify-between gap-3 bg-black/40 p-1 rounded-md">
                        <div className="relative flex flex-row w-full h-full text-white font-aust items-center justify-start gap-2">
                          <div
                            className={`relative rounded-full flex bg-black w-6 h-6 items-center justify-center`}
                            id="pfp"
                          >
                            {des1 && (
                              <Image
                                src={des1}
                                objectFit="cover"
                                alt="pfp"
                                layout="fill"
                                className="relative w-fit h-fit rounded-full items-center justify-center flex"
                                draggable={false}
                              />
                            )}
                          </div>
                          <div className="relative items-center justify-center w-fit h-fit text-xs flex break-all">
                            {
                              desafiantes?.[1]?.perfil?.handle
                                ?.suggestedFormatted?.localName
                            }
                          </div>
                        </div>
                        <div className="relative w-full h-fit flex items-center justify-end">
                          <div
                            className="relative w-24 text-xs font-bit text-viol h-8 flex items-center justify-center cursor-pointer hover:opacity-70"
                            onClick={() =>
                              router.push(
                                `/npc/${desafiantes?.[1]?.perfil?.handle?.suggestedFormatted?.localName}`
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
                            src={`${INFURA_GATEWAY}/ipfs/${desafiantes?.[1]?.tapa_dos}`}
                            layout="fill"
                            objectFit="contain"
                            draggable={false}
                          />
                        </div>
                        <div className="realtive w-full h-fit bg-black/80 p-2 flex flex-col items-center justify-between gap-2 text-xxs font-super text-sol">
                          <div className="relative w-full h-px flex items-start justify-start bg-azulito"></div>
                          <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {dict.Home.auEarned}
                            </div>
                            <div className="relative w-fit h-fit flex items-center justify-center text-xxxs">
                              {desafiantes?.[1]?.auEarnedTotal || 0} $AU
                            </div>
                          </div>
                          <div className="relative w-full h-px flex items-start justify-start bg-[#FF4EFF]"></div>
                          <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {dict.Home.activeJobs}
                            </div>
                            <div className="relative w-fit text-xxxs h-fit flex items-center justify-center">
                              {desafiantes?.[1]?.activeJobs || 0}
                            </div>
                          </div>
                          <div className="relative w-full h-px flex items-start justify-start bg-[#F6FC8D]"></div>
                          <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {dict.Home.currentScore}
                            </div>
                            <div className="relative w-fit h-fit text-xxxs flex items-center justify-center">
                              {desafiantes?.[1]?.currentGlobalScore || 0}
                            </div>
                          </div>
                          <div className="relative w-full h-px flex items-start justify-start bg-[#65B0FF]"></div>
                          <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {dict.Home.rentPaid}
                            </div>
                            <div className="relative w-fit text-xxxs h-fit flex items-center justify-center">
                              {desafiantes?.[1]?.auPaidTotal || 0} $AU
                            </div>
                          </div>
                          <div className="relative w-full h-px flex items-start justify-start bg-[#09FF6B]"></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {todosLosNPCs?.length > 0 && (
                <Seleccion
                  desafiantes={desafiantes}
                  setDesafiantes={setDesafiantes}
                  todosLosDesafiantes={todosLosDesafiantes}
                  indice={1}
                />
              )}
            </div>
          </div>
          <div className="rounded-sm p-2 sm:p-4 md:p-10 relative w-full h-fit sm:h-[60rem] border-4 border-flor bg-gris">
            <div
              className={`relative w-full h-full flex items-start justify-start border-2 border-[#35C3E6] bg-[#35C3E6] font-lib ${
                todosLosNPCs?.length < 1 && "animate-pulse"
              }`}
            >
              {todosLosNPCs?.length > 0 && (
                <div className="relative w-full h-fit sm:h-full flex flex-col sm:flex-row items-stretch justify-between gap-7 border-8 border-[#0000B0] bg-black p-3">
                  <div className="relative w-full h-fit sm:h-full justify-between flex flex-col gap-8 items-center overflow-y-scroll">
                    <div className="relative w-full h-fit flex flex-row gap-3 items-center justify-between">
                      <div className="relative w-fit h-fit text-white flex items-start justify-start text-2xl">
                        {dict.Home.activeWeeks}
                      </div>
                      <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar text-viol2">
                        {desafiantes?.[0]?.activeWeeks || 0}
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex items-center justify-center gap-3 xl:flex-nowrap flex-wrap">
                      <Petalos
                        puntaje={desafiantes?.[0]?.currentWeeklyScore}
                        total={desafiantes?.[0]?.currentGlobalScore}
                        colorUno="#FFAA00"
                        colorDos="#3274FF"
                        titulo={dict.Home.globalW}
                      />
                      <Petalos
                        puntaje={desafiantes?.[0]?.currentGlobalScore}
                        total={desafiantes?.[0]?.allGlobalScore}
                        colorUno="#00FFFF"
                        colorDos="#CC04FD"
                        titulo={dict.Home.globalN}
                      />
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start">
                      <div className="relative w-fit h-fit text-white flex items-start justify-start text-xl">
                        {dict.Home.lensStats}
                      </div>
                      <div className="relative w-full h-fit flex flex-row justify-between items-start gap-3 text-viol2 xl:flex-nowrap flex-wrap">
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-2xl">
                            {desafiantes?.[0]?.perfil?.stats?.followers}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar">
                            {dict.Home.seguidores}
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-2xl">
                            {desafiantes?.[0]?.perfil?.stats?.following}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar">
                            {dict.Home.siguiendo}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full h-fit flex flex-wrap justify-between items-start gap-3 text-viol2">
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-lg">
                            {desafiantes?.[0]?.perfil?.stats?.posts || 0}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                            {dict.Home.Pubs}
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-lg">
                            {desafiantes?.[0]?.perfil?.stats?.mirrors || 0}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                            {dict.Home.Mirrors}
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-lg">
                            {desafiantes?.[0]?.perfil?.stats?.comments || 0}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                            {dict.Home.Comments}
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-lg">
                            {desafiantes?.[0]?.perfil?.stats?.reactions || 0}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                            {dict.Home.Likes}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start">
                      <div className="relative w-fit h-fit text-white flex items-start justify-start text-xl">
                        {dict.Home.rentPaid}
                      </div>
                      {desafiantes?.[0]?.rentTransactions?.length > 0 ? (
                        <div className="relative w-full h-fit max-h-[10rem] overflow-y-scroll flex flex-col gap-1.5 items-start justify-start">
                          {desafiantes?.[0]?.rentTransactions?.map(
                            (
                              alquiler: {
                                amount: number;
                                transactionHash: number;
                                blockTimestamp: number;
                              },
                              indice: number
                            ) => {
                              return (
                                <div
                                  key={indice}
                                  className="relative w-full h-12 flex items-center justify-between flex-row px-1.5 py-1 cursor-pointer hover:opacity-70 border-viol2 bg-gris border text-black"
                                  onClick={() =>
                                    window.open(
                                      `https://polygonscan.com/tx/${alquiler.transactionHash}`
                                    )
                                  }
                                >
                                  <div className="relative cursor-pointer w-fit h-fit break-all text-sm">
                                    {moment
                                      .unix(Number(alquiler?.blockTimestamp))
                                      .format("YYYY-MM-DD HH:mm:ss")}
                                  </div>
                                  <div className="relative cursor-pointer w-fit h-fit break-all text-lg text-viol2">
                                    {Number(alquiler?.amount || 0)}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <div className="relative w-full h-fit flex items-start justify-start text-viol2 break-all text-sm">
                          {dict.Home.noRentPaid}
                        </div>
                      )}
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start">
                      <div className="relative w-fit h-fit text-white flex items-start justify-start text-xl">
                        {dict.Home.escenasActivas}
                      </div>
                      <div className="relative w-fit h-fit flex items-center justify-center text-sm flex-row">
                        <div className="relative w-32 h-24 flex items-center justify-center">
                          <Image
                            objectFit="cover"
                            draggable={false}
                            layout="fill"
                            src={`${INFURA_GATEWAY}/ipfs/${
                              escenas?.find((e) =>
                                e.sprites?.find(
                                  (spr) =>
                                    spr.perfil_id == desafiantes?.[0]?.perfil_id
                                )
                              )?.imagen
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full sm:w-2 h-2 sm:h-full bg-[#0000B0] flex"></div>
                  <div className="relative w-full h-fit sm:h-full justify-between flex flex-col gap-8 items-center overflow-y-scroll">
                    <div className="relative w-full h-fit flex flex-row gap-3 items-center justify-between">
                      <div className="relative w-fit h-fit text-white flex items-start justify-start text-2xl">
                        {dict.Home.activeWeeks}
                      </div>
                      <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar text-flor">
                        {desafiantes?.[1]?.activeWeeks || "0"}
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex items-center justify-center gap-3  xl:flex-nowrap flex-wrap">
                      <Petalos
                        puntaje={desafiantes?.[1]?.currentWeeklyScore}
                        total={desafiantes?.[1]?.currentGlobalScore}
                        colorUno="#4B0099"
                        colorDos="#FBFF24"
                        titulo={dict.Home.globalW}
                      />
                      <Petalos
                        puntaje={desafiantes?.[1]?.currentGlobalScore}
                        total={desafiantes?.[1]?.allGlobalScore}
                        colorUno="#C993FF"
                        colorDos="#23DBAA"
                        titulo={dict.Home.globalN}
                      />
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start">
                      <div className="relative w-fit h-fit text-white flex items-start justify-start text-xl">
                        {dict.Home.lensStats}
                      </div>
                      <div className="relative w-full h-fit flex flex-row justify-between items-start gap-3 text-flor xl:flex-nowrap flex-wrap">
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-2xl">
                            {desafiantes?.[1]?.perfil?.stats?.followers}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar">
                            {dict.Home.seguidores}
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-2xl">
                            {desafiantes?.[1]?.perfil?.stats?.following}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar">
                            {dict.Home.siguiendo}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full h-fit flex flex-wrap justify-between items-start gap-3 text-flor">
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-lg">
                            {desafiantes?.[1]?.perfil?.stats?.posts || 0}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                            {dict.Home.Pubs}
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-lg">
                            {desafiantes?.[1]?.perfil?.stats?.mirrors || 0}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                            {dict.Home.Mirrors}
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-lg">
                            {desafiantes?.[1]?.perfil?.stats?.comments || 0}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                            {dict.Home.Comments}
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
                          <div className="flex w-fit h-fit items-center justify-center text-lg">
                            {desafiantes?.[1]?.perfil?.stats?.reactions || 0}
                          </div>
                          <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                            {dict.Home.Likes}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start">
                      <div className="relative w-fit h-fit text-white flex items-start justify-start text-xl">
                        {dict.Home.rentPaid}
                      </div>
                      {desafiantes?.[1]?.rentTransactions?.length > 0 ? (
                        <div className="relative w-full h-fit max-h-[10rem] overflow-y-scroll flex flex-col gap-1.5 items-start justify-start">
                          {desafiantes?.[1]?.rentTransactions?.map(
                            (
                              alquiler: {
                                amount: number;
                                transactionHash: number;
                                blockTimestamp: number;
                              },
                              indice: number
                            ) => {
                              return (
                                <div
                                  key={indice}
                                  className="relative w-full h-12 flex items-center justify-between flex-row px-1.5 py-1 cursor-pointer hover:opacity-70 border-flor bg-gris border text-black"
                                  onClick={() =>
                                    window.open(
                                      `https://polygonscan.com/tx/${alquiler.transactionHash}`
                                    )
                                  }
                                >
                                  <div className="relative cursor-pointer w-fit h-fit break-all text-sm">
                                    {moment
                                      .unix(Number(alquiler?.blockTimestamp))
                                      .format("YYYY-MM-DD HH:mm:ss")}
                                  </div>
                                  <div className="relative cursor-pointer w-fit h-fit break-all text-lg text-flor">
                                    {Number(alquiler?.amount || 0)}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <div className="relative w-full h-fit flex items-start justify-start text-flor break-all text-sm">
                          {dict.Home.noRentPaid}
                        </div>
                      )}
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start">
                      <div className="relative w-fit h-fit text-white flex items-start justify-start text-xl">
                        {dict.Home.escenasActivas}
                      </div>
                      <div className="relative w-fit h-fit flex items-center justify-center text-sm flex-row">
                        <div className="relative w-32 h-24 flex items-center justify-center">
                          <Image
                            objectFit="cover"
                            draggable={false}
                            layout="fill"
                            src={`${INFURA_GATEWAY}/ipfs/${
                              escenas?.find((e) =>
                                e.sprites?.find(
                                  (spr) =>
                                    spr.perfil_id == desafiantes?.[1]?.perfil_id
                                )
                              )?.imagen
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmRAcBfJGebTPihDVgryhVUa3PtmtVEb4UMvbdqmwC3RUi`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );

    case Pantalla.Espectador:
      const pfp = createProfilePicture(lensConectado?.metadata?.picture);
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[10vw]" : "text-[8vw]"
            }`}
          >
            {dict.Home.espectar}
          </div>
          <div className="relative w-full h-fit py-20 flex items-center justify-center sm:pr-4">
            <div className="relative w-full h-fit flex flex-col xl:flex-row gap-10 items-center justify-center">
              <div className="relative w-full h-[48rem] flex flex-col items-center justify-center gap-6">
                <div className="relative w-full h-fit flex items-start justify-between flex-col gap-2">
                  <div className="relative w-full h-fit flex items-start justify-start font-at text-sm text-white">
                    {dict.Home.tokensH}
                  </div>
                  <div className="relative w-full flex flex-wrap gap-6 justify-between h-fit">
                    {[
                      {
                        titulo: "MONA",
                        valor: tokensGuardados?.mona,
                      },
                      {
                        titulo: "AU",
                        valor: tokensGuardados?.au,
                      },
                      {
                        titulo: "DLTA",
                        valor: tokensGuardados?.delta,
                      },
                      {
                        titulo: "Genesis",
                        valor: tokensGuardados?.genesis,
                      },
                      {
                        titulo: "Fashion",
                        valor: tokensGuardados?.fashion,
                      },
                      {
                        titulo: "PODE",
                        valor: tokensGuardados?.pode,
                      },
                    ]?.map(
                      (
                        elem: {
                          titulo: string;
                          valor: bigint;
                        },
                        indice: number
                      ) => {
                        return (
                          <div
                            key={indice}
                            className="relative w-28 px-1 py-px border-2 border-azulito rounded-sm h-fit flex flex-row gap-2 items-center justify-between bg-offNegro"
                          >
                            <div className="relative w-fit h-fit flex items-center justify-start text-sol">
                              {elem?.titulo}
                              {": "}
                            </div>
                            <div className="relative w-fit h-fit flex items-center justify-end text-white">
                              {indice < 3
                                ? Number(elem?.valor || 0) / 10 ** 18
                                : elem?.valor}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/Qmab2a5syZ5rVB6oHQV12Lrruzyzx5A1oyC1RWdQsK8Mt6`}
                    layout="fill"
                    objectFit="fill"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="relative w-full h-[48rem] flex flex-col items-center justify-center gap-6">
                <div className="relative w-full flex font-at text-sm text-white h-fit items-end justify-end">
                  <div
                    className={`relative border-azulito border rounded-md bg-viol w-20 h-10 flex items-center justify-center ${
                      !lensCargando &&
                      "cursor-pointer active:scale-90 hover:scale-95 hover:opacity-80"
                    }`}
                    onClick={
                      !lensCargando
                        ? !isConnected
                          ? openConnectModal
                          : !lensConectado && isConnected
                          ? () => manejarLens()
                          : () => manejarSalir()
                        : () => {}
                    }
                  >
                    {lensCargando && (
                      <div className="absolute w-fit h-fit flex items-center justify-center animate-spin">
                        <AiOutlineLoading color={"white"} size={15} />
                      </div>
                    )}
                    <div
                      className={`relative w-fit h-fit flex items-center justify-center ${
                        lensCargando && "opacity-40"
                      }`}
                    >
                      {!lensConectado && !isConnected
                        ? dict.Home.connect
                        : isConnected && !lensConectado
                        ? "Lens"
                        : dict.Home.exit}
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-full flex items-center justify-end flex-row gap-3">
                  <div className="relative text-base flex items-center justify-center font-lib text-white rotate-90">
                    {dict.Home.weeklyWeight} {espectadorInfo?.weekWeight}
                  </div>
                  <div className="relative w-3/5 h-full flex items-center justify-center border-4 rounded-md border-azulito bg-viol flex-col justify-between gap-4 items-stretch p-2">
                    <div className="relative w-full h-full flex flex-row gap-4 justify-between items-start">
                      <div className="relative w-fit h-fit items-center justify-start font-at text-white text-2xl break-all">
                        {lensConectado?.handle?.localName}
                      </div>
                      <div className="relative w-fit h-fit items-center justify-start">
                        <div className="rounded-full w-28 h-28 border border-azulito bg-azulito">
                          {pfp && (
                            <Image
                              src={pfp}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-full"
                              draggable={false}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full h-full flex flex-row gap-4 justify-between items-end font-vcr text-3xl">
                      <div className="relative w-fit h-fit items-center justify-start">
                        {espectadorInfo?.auEarnedTotal}
                      </div>
                      <div className="relative w-fit h-fit items-center justify-start text-white">
                        $AU
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-full flex items-center justify-center border-4 p-3 flex-col gap-3 rounded-md border-sol">
                  <div className="relative w-full h-20 flex border bg-[#00FFFF]/60 border-[#6FFA95] flex-row items-center justify-between p-1 gap-3 text-[#F6FC8D] font-super text-lg">
                    <div className="relative w-fit h-fit items-center justify-start">
                      $AU
                    </div>
                    <div className="relative w-fit h-fit items-center justify-start">
                      {espectadorInfo?.auClaimedTotal}
                    </div>
                  </div>
                  <div className="h-px w-full bg-[#CC04FD]"></div>
                  <div className="relative w-full h-full flex items-start justify-start flex-row gap-3">
                    <div className="relative w-full h-full items-start justify-between flex-col flex gap-3 text-white">
                      <div className="font-vcr text-2xl text-left w-fit h-fit flex">
                        {dict.Home.claimedAU}
                      </div>
                      <div className="font-super text-lg text-left w-fit h-fit flex">
                        {espectadorInfo?.auUnclaimedTotal} $AU
                      </div>
                    </div>
                    <div
                      className={`relative w-fit h-full flex items-end justify-end`}
                    >
                      <div
                        className={`relative w-28 h-8 flex items-center justify-center text-xs font-bit text-viol text-center ${
                          Number(espectadorInfo?.auUnclaimedTotal) <= 0 ||
                          !lensConectado?.id
                            ? "opacity-70"
                            : "cursor-pointer hover:opacity-70"
                        }`}
                        onClick={() =>
                          Number(espectadorInfo?.auUnclaimedTotal) > 0 &&
                          !cogerCargando &&
                          lensConectado?.id &&
                          manejarCoger()
                        }
                      >
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
                          layout="fill"
                          objectFit="fill"
                          draggable={false}
                        />
                        <div
                          className={`absolute w-full h-full flex items-center justify-center whitespace-nowrap ${
                            cogerCargando && "animate-spin"
                          }`}
                        >
                          {cogerCargando ? (
                            <AiOutlineLoading color="white" size={15} />
                          ) : (
                            dict.Home.reclamar
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmdRLJ8bWfTgJ92TiXTQU4wU46xtYURebNNRC4qyBMkCN8`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );

    case Pantalla.Tabla:
      const led1 = createProfilePicture(tabla?.[0]?.perfil?.metadata?.picture);
      const led2 = createProfilePicture(tabla?.[1]?.perfil?.metadata?.picture);
      const led3 = createProfilePicture(tabla?.[2]?.perfil?.metadata?.picture);
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[10vw]" : "text-[8vw]"
            }`}
          >
            {dict.Home.leader}
          </div>
          <div className="relative w-full h-fit py-20 flex items-center justify-center sm:pr-4">
            <div className="relative w-full h-fit flex flex-col gap-10 items-start justify-center">
              <div className="relative w-full h-fit flex items-center justify-center flex-col gap-6 font-vcr">
                <div className="relative w-full h-fit flex items-center justify-between flex-col sm:flex-row gap-8">
                  <div className="relative w-full h-fit sm:h-44 flex sm:flex-row flex-col items-center justify-center border-4 border-flor bg-salmon">
                    <div className="relative w-full sm:absolute z-10 top-0 left-0 sm:w-1/2 h-60 sm:h-full flex">
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/QmfBWguNxhoJqvuom7hc5r3FNztMnLZNgyA1CX3GjAugFs`}
                        layout="fill"
                        objectFit="fill"
                        draggable={false}
                      />
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center flex-col sm:flex-row gap-4 p-1">
                      <div className="relative w-full justify-end items-center flex h-fit">
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          <div className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa bg-costa">
                            {led1 && (
                              <Image
                                src={led1}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                                draggable={false}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-3/5 justify-between items-center flex h-full flex-col">
                        <div className="relative w-full h-fit flex items-center justify-end text-2xl">
                          {tabla?.[0]?.totalScore || 0}
                        </div>
                        <div className="relative w-full h-8 flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/QmY827FfqYeW6JMXjtcAhh8FEa8K6eckjf7R5VVaXZrBp3`}
                            layout="fill"
                            objectFit="fill"
                            draggable={false}
                          />
                        </div>
                        <div className="relative w-full h-fit flex items-center justify-end text-white text-2xl">
                          $AU
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-fit sm:h-44 flex items-center justify-center border-4 border-flor bg-viol sm:-top-20 sm:flex-row flex-col">
                    <div className="relative w-full sm:absolute z-10 top-0 left-0 sm:w-1/2 h-60 sm:h-full flex">
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/QmaT9VM3Rqb4NRGmrjm7EAKMFXFZertxadqTTA7CeKy7NN`}
                        layout="fill"
                        objectFit="fill"
                        draggable={false}
                      />
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center flex-col sm:flex-row gap-4 p-1">
                      <div className="relative w-full justify-end items-center flex h-fit">
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          <div className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa bg-costa">
                            {led2 && (
                              <Image
                                src={led2}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                                draggable={false}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-3/5 justify-between items-center flex h-full flex-col">
                        <div className="relative w-full h-fit flex items-center justify-end text-2xl">
                          {tabla?.[1]?.totalScore || 0}
                        </div>
                        <div className="relative w-full h-8 flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/QmY827FfqYeW6JMXjtcAhh8FEa8K6eckjf7R5VVaXZrBp3`}
                            layout="fill"
                            objectFit="fill"
                            draggable={false}
                          />
                        </div>
                        <div className="relative w-full h-fit flex items-center justify-end text-white text-2xl">
                          $AU
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-fit sm:h-44 flex items-center justify-center border-4 border-flor bg-salmon sm:flex-row flex-col">
                    <div className="relative w-full sm:absolute z-10 top-0 left-0 sm:w-1/2 h-60 sm:h-full flex">
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/QmV3Tu48mvZ5p7F3yktSW6KHr23FqjucY2XWvr8x5nM9UV`}
                        layout="fill"
                        objectFit="fill"
                        draggable={false}
                      />
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center flex-col sm:flex-row gap-4 p-1">
                      <div className="relative w-full justify-end items-center flex h-fit">
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          <div className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa bg-costa">
                            {led3 && (
                              <Image
                                src={led3}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                                draggable={false}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-3/5 justify-between items-center flex h-full flex-col">
                        <div className="relative w-full h-fit flex items-center justify-end break-all text-2xl">
                          {tabla?.[2]?.totalScore || 0}
                        </div>
                        <div className="relative w-full h-8 flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/QmY827FfqYeW6JMXjtcAhh8FEa8K6eckjf7R5VVaXZrBp3`}
                            layout="fill"
                            objectFit="fill"
                            draggable={false}
                          />
                        </div>
                        <div className="relative w-full h-fit flex items-center justify-end break-all text-white text-2xl">
                          $AU
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="relative w-full h-fit sm:h-20 flex items-stretch justify-between flex-col gap-3 border-t-4 border-b border-x-4 border-white rounded-md">
                  <div className="relative w-full h-fit sm:h-full bg-gris flex flex-row items-center justify-center sm:justify-between text-xxs font-clar text-black sm:flex-nowrap flex-wrap">
                    <div className="relative justify-start items-center gap-1.5 flex flex-row">
                      <div className="bg-limon w-fit h-fit py-1 px-2 rounded-sm flex items-center justify-center text-center">
                        {dict.Home.score}
                      </div>
                      <div className="bg-crema border py-1 px-2 border-zana w-fit h-fit rounded-sm flex items-center justify-center text-center">
                        $AU
                      </div>
                      <div className="bg-crema border py-1 px-2 border-zana w-fit h-fit break-all rounded-sm flex items-center justify-center text-center">
                        {dict.Home.actividad}
                      </div>
                      <div className="bg-crema border py-1 px-2 border-zana w-fit h-fit break-all rounded-sm flex items-center justify-center text-center">
                        {dict.Home.variancia}
                      </div>
                    </div>
                    <div className="relative justify-end items-center gap-1.5 flex flex-row">
                      <div className="bg-zana w-fit h-fit py-1 px-2 rounded-sm flex items-center break-all justify-center text-center">
                        {dict.Home.semanal}
                      </div>
                      <div className="bg-crema border py-1 px-2 border-zana w-fit h-fit rounded-sm flex items-center justify-center text-center break-all">
                        {dict.Home.todo}
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-10 sm:h-full flex items-center justify-center">
                    <input
                      className="focus:outline-none bg-black w-full h-full relative text-center font-clar text-base text-verde placeholder:text-verde placeholder:opacity-100"
                      placeholder={dict.Home.buscar}
                    />
                  </div>
                </div> */}
              </div>
              <div className="relative w-full h-[80rem] flex flex-col items-center justify-center gap-6">
                <div
                  className="absolute top-72 left-0 w-full flex items-start justify-start flex-col px-10 pb-10"
                  style={{ height: "calc(100% - 18rem)" }}
                >
                  <div className="relative w-full h-10 flex text-left items-start gap-3 flex-row justify-between  overflow-x-scroll">
                    {[
                      dict.Home.rango,
                      dict.Home.espectador,
                      dict.Home.scoreW,
                      dict.Home.scoreG,
                      "$AU",
                    ].map((texto: string, indice: number) => {
                      return (
                        <div
                          key={indice}
                          className="relative w-full h-fit flex items-center justify-center text-center text-white font-bit text-xxs"
                        >
                          {texto}
                        </div>
                      );
                    })}
                  </div>
                  <div className="relative flex w-full h-full overflow-y-scroll overflow-x-scroll">
                    <div className="relative w-full h-fit items-start justify-start overflow-y-scroll  overflow-x-scroll flex flex-col">
                      {tabla?.length > 0
                        ? tabla.map(
                            (
                              tab: {
                                perfil: Profile | undefined;
                                totalScore: number;
                                weeklyScore: number;
                                tipo: number;
                                totalAU: number
                              },
                              i
                            ) => {
                              const pfp = createProfilePicture(
                                tab?.perfil?.metadata?.picture
                              );
                              return (
                                <div
                                  key={i}
                                  className={`relative w-full h-10 flex text-left items-start gap-3 flex-row justify-between font-clar text-white ${
                                    i % 2 == 0 ? "bg-costa" : "bg-black"
                                  }`}
                                >
                                  <div className="relative w-fit h-fit flex items-center justify-center">
                                    {i + 1}
                                  </div>
                                  <div className="relative w-fit h-fit flex items-center justify-center">
                                    <div className="relative w-6 h-6 rounded-full flex items-center justify-center border border-costa bg-costa">
                                      {pfp && (
                                        <Image
                                          src={pfp}
                                          layout="fill"
                                          objectFit="cover"
                                          className="rounded-full"
                                          draggable={false}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="relative font-at w-fit h-fit flex items-center justify-center">
                                    {Number(
                                      tab?.perfil?.handle?.localName?.length
                                    ) > 10
                                      ? tab?.perfil?.handle?.localName?.substring(
                                          0,
                                          10
                                        )
                                      : tab?.perfil?.handle?.localName}
                                  </div>
                                  <div className="relative w-fit h-fit flex items-center justify-center">
                                    {tab?.weeklyScore}
                                  </div>
                                  <div className="relative w-fit h-fit flex items-center justify-center text-rayas">
                                    {tab?.totalScore}
                                  </div>
                                  <div className="relative w-fit h-fit flex items-center justify-center text-rayas">
                                    {tab?.totalAU}
                                  </div>
                                </div>
                              );
                            }
                          )
                        : Array.from({ length: 100 }).map((_, i) => {
                            return (
                              <div
                                key={i}
                                className={`relative w-full h-10 flex text-left items-center gap-3 flex-row justify-between ${
                                  i % 2 == 0 ? "bg-costa" : "bg-black"
                                }`}
                              >
                                {i == 0 && (
                                  <div className="text-xxs break-all text-white font-lib text-center w-full h-fit">
                                    {dict.Home.leaderboard}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>
                <div className="relative flex w-full h-full">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/QmaYXpZxX8mc2G52aRycB5eHofvmGYtEKotJsuze9gehUH`}
                    layout="fill"
                    objectFit="fill"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmZ3fqF7shCsNbAUuFLvSz3Mg8ARKsvXmJaTmN6GWA3SNB`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );

    default:
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[8vw]" : "text-[6vw]"
            }`}
          >
            {dict.Home.scorecard}
          </div>
          <div className="relative w-full h-fit py-20 flex items-center justify-center flex-col gap-24">
            <Puntaje />
            <div className="relative w-fit h-fit flex items-center justify-center flex-col gap-3">
              <div className="relative w-32 md:w-52 h-32 md:h-52 rounded-full flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmVUd78Y5zAjsF6saC4SnRmQYAqnqTrTNRLErGBKz7zbZY`}
                  layout="fill"
                  objectFit="cover"
                  draggable={false}
                />
              </div>
              <div className="relative lg:w-1/2 w-4/5 h-fit flex items-center justify-center break-words text-xs text-center font-clar text-limon">
                {dict.Home.stats}
              </div>
            </div>
            <Agentes
              router={router}
              mostrarMas={mostrarMas}
              setMostrarMas={setMostrarMas}
              todosLosNPCs={todosLosNPCs}
              dict={dict}
              npcsCargando={npcsCargando}
              informacion={informacion}
              escenas={escenas}
            />
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmTPTQ7w3ZWETDBwsC5HB2TkcHTik85Hpy9thbXZg6nREw`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );
  }
};

export default Cambio;
