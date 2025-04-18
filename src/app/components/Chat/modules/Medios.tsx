import { INFURA_GATEWAY } from "@/app/lib/constants";
import descripcionRegex from "@/app/lib/helpers/descripcionRegex";
import { ModalContext } from "@/app/providers";
import {
  AudioMetadata,
  ImageMetadata,
  MediaAudio,
  MediaImage,
  MediaVideo,
  VideoMetadata,
} from "@lens-protocol/client";
import { FunctionComponent, JSX, useContext } from "react";
import MediosCambio from "./MediosCambio";
import { metadataMedios } from "@/app/lib/helpers/metadataMedios";

const Medios: FunctionComponent<{
  metadata: VideoMetadata | ImageMetadata | AudioMetadata;
}> = ({ metadata }): JSX.Element => {
  const contexto = useContext(ModalContext);
  const count = [
    metadata?.__typename == "ImageMetadata"
      ? metadata?.image
      : metadata?.__typename == "VideoMetadata"
      ? metadata?.video
      : metadata?.audio,
    ...(metadata?.attachments || []),
  ].filter(Boolean);
  return (
    <div className="relative w-full h-fit flex flex-col justify-start items-center gap-3 break-all max-w-full">
      {metadata?.content && metadata?.content?.trim() !== "" && (
        <div
          className={`relative w-full h-fit max-h-[12rem] font-aust  text-left items-start justify-start break-all flex overflow-y-scroll p-3 text-sm whitespace-preline ${
            metadata?.__typename === "ImageMetadata" ||
            metadata?.__typename === "VideoMetadata"
              ? "bg-rosa text-black"
              : "bg-oscuro text-black"
          }`}
          dangerouslySetInnerHTML={{
            __html: descripcionRegex(
              metadata?.content,
              metadata?.__typename === "VideoMetadata" ? true : false
            ),
          }}
        ></div>
      )}
      <div
        className={`relative w-full h-fit overflow-x-scroll gap-2 items-center justify-start flex`}
      >
        <div
          className={`relative h-fit gap-2 flex flex-row items-start justify-start ${
            count?.length == 1 ? "w-full" : "w-fit"
          }`}
        >
          {count?.length > 0 &&
            [
              metadata?.__typename == "ImageMetadata"
                ? metadata?.image
                : metadata?.__typename == "VideoMetadata"
                ? metadata?.video
                : metadata?.audio,
              ...(metadata?.attachments || []),
            ]
              ?.filter(Boolean)
              ?.map(
                (
                  elemento: MediaAudio | MediaVideo | MediaImage,
                  indice: number
                ) => {
                  const media = metadataMedios(elemento);
                  return (
                    <div
                      key={indice}
                      className={`relative border border-white rounded-sm h-fit flex items-center justify-center bg-black ${
                        media?.url && "cursor-pointer"
                      } ${count?.length == 1 ? "w-full" : "w-fit"}`}
                      onClick={() =>
                        media?.type === "Image" &&
                        contexto?.setVerImagen({
                          abierto: true,
                          tipo: media?.type,
                          url: media?.url,
                        })
                      }
                    >
                      <div
                        className={`relative h-60 flex rounded-sm items-center justify-center ${
                          count?.length == 1 ? "w-full" : "w-60"
                        }`}
                      >
                        {media?.url && (
                          <MediosCambio
                            ola
                            tipo={media?.type}
                            fuenteUrl={media?.url}
                            fuenteFondo={media?.cover}
                            classNameVideo={{
                              objectFit: "cover",
                              display: "flex",
                              width: "100%",
                              height: "100%",
                              alignItems: "center",
                              justifyItems: "center",
                              borderRadius: "0.125rem",
                              position: "absolute",
                            }}
                            classNameImagen={"rounded-sm"}
                            classNameAudio={"rounded-md"}
                          />
                        )}
                      </div>
                    </div>
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
};

export default Medios;
