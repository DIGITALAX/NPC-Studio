import Image from "next/legacy/image";
import { FunctionComponent, JSX, useState } from "react";
import Ola from "./Ola";
import { MediosCambioProps } from "../types/chat.types";

const MediosCambio: FunctionComponent<MediosCambioProps> = ({
  tipo,
  fuenteUrl,
  fuenteFondo,
  classNameVideo,
  classNameImagen,
  classNameAudio,
  ola,
}): JSX.Element => {
  const [videoInfo, setVideoInfo] = useState<{
    cargando: boolean;
    horaActual: number;
    duracion: number;
    empezado: boolean;
  }>({
    cargando: false,
    horaActual: 0,
    duracion: 0,
    empezado: false,
  });
  switch (tipo?.toLowerCase()) {
    case "video":
      return (
        <>
          <div id={fuenteUrl} style={classNameVideo}>
            <video
              muted={!ola}
              autoPlay={!ola}
              loop={!ola}
              style={classNameVideo}
            >
              <source src={fuenteUrl} />
            </video>
            {/* <KinoraPlayerWrapper
              parentId={srcUrl}
              key={srcUrl}
              customControls={true}
              play={videoInfo?.isPlaying}
              styles={classNameVideo}
              fillWidthHeight
              seekTo={{
                id: Math.random() * 0.5,
                time: videoInfo?.currentTime,
              }}
              onTimeUpdate={(e) =>
                setVideoInfo((prev) => ({
                  ...prev,
                  currentTime: (e.target as any)?.currentTime || 0,
                }))
              }
              onCanPlay={(e) =>
                setVideoInfo((prev) => ({
                  ...prev,
                  isPlaying: true,
                  duration: (e.target as any)?.duration || 0,
                }))
              }
              volume={{
                id: Math.random() * 0.5,
                level: hidden ? 0 : 0.5,
              }}
            >
              {(setMediaElement: (node: HTMLVideoElement) => void) => (
                <Player
                  mediaElementRef={setMediaElement}
                  src={
                    srcUrl?.includes("https://")
                      ? srcUrl
                      : `${INFURA_GATEWAY}/ipfs/${
                          srcUrl?.includes("ipfs://")
                            ? srcUrl?.split("ipfs://")[1]
                            : srcUrl
                        }`
                  }
                  poster={srcCover}
                  objectFit="cover"
                  // autoUrlUpload={{
                  //   fallback: true,
                  //   ipfsGateway: INFURA_GATEWAY,
                  // }}
                  loop={hidden}
                  autoPlay={hidden}
                  muted={true}
                />
              )}
            </KinoraPlayerWrapper> */}
          </div>
          {ola && (
            <Ola
              audio={fuenteUrl}
              tipo={"video"}
              clave={fuenteUrl}
              video={fuenteUrl}
              manejarVideoPausado={() =>
                setVideoInfo((prev) => {
                  return {
                    ...prev,
                    isPlaying: false,
                  };
                })
              }
              manejarVideoEmpezado={() =>
                setVideoInfo((prev) => {
                  return {
                    ...prev,
                    isPlaying: true,
                  };
                })
              }
              manejarVideoBuscado={(e) =>
                setVideoInfo((prev) => ({
                  ...prev,
                  currentTime: e,
                }))
              }
              informacionVideo={videoInfo}
            />
          )}
        </>
      );

    case "audio":
      const keyValueAudio = fuenteUrl + Math.random().toString();
      return (
        <>
          <Image
            src={fuenteFondo!}
            layout="fill"
            objectFit={"cover"}
            className={classNameAudio}
            draggable={false}
          />
          <Ola
            audio={fuenteUrl}
            tipo={"audio"}
            clave={keyValueAudio}
            video={fuenteUrl}
          />
        </>
      );

    default:
      return (
        <Image
          src={fuenteUrl}
          layout="fill"
          objectFit={"cover"}
          objectPosition={"center"}
          className={classNameImagen}
          draggable={false}
        />
      );
  }
};

export default MediosCambio;
