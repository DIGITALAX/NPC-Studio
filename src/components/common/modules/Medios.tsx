import descripcionRegex from "@/lib/helpers/descripcionRegex";
import { FunctionComponent } from "react";
import { MediosProps } from "../types/common.types";
import { PublicationMetadataMedia } from "../../../../graphql/generated";
import { metadataMedios } from "@/lib/helpers/metadataPublicacion";
import MediosCambio from "./MediosCambio";

const Medios: FunctionComponent<MediosProps> = ({
  metadata,
  setVerImagen,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex flex-col justify-start items-center gap-3 break-words max-w-full">
      {metadata?.content && metadata?.content?.trim() !== "" && (
        <div
          className={`relative w-full h-fit max-h-[12rem] font-aust  text-left items-start justify-start break-all flex overflow-y-scroll p-3 text-sm whitespace-preline ${
            metadata?.__typename === "ImageMetadataV3" ||
            metadata?.__typename === "VideoMetadataV3"
              ? "bg-rosa text-black"
              : "bg-oscuro text-black"
          }`}
          dangerouslySetInnerHTML={{
            __html: descripcionRegex(
              metadata?.content,
              metadata?.__typename === "VideoMetadataV3" ? true : false
            ),
          }}
        ></div>
      )}
      <div
        className={`relative w-full h-fit overflow-x-scroll gap-2 items-center justify-start flex`}
      >
        <div className="relative w-fit h-fit gap-2 flex flex-row items-center justify-start">
          {[metadata?.asset, ...(metadata?.attachments || [])].filter(Boolean)
            ?.length > 0 &&
            [metadata?.asset, ...(metadata?.attachments || [])]
              ?.filter(Boolean)
              ?.map((elemento: PublicationMetadataMedia, indice: number) => {
                const media = metadataMedios(elemento);

                return (
                  <div
                    key={indice}
                    className={`w-60 relative border border-white rounded-sm h-60 flex items-center justify-center bg-black ${
                      media?.url && "cursor-pointer"
                    }`}
                    onClick={() =>
                      media?.type === "Image" &&
                      setVerImagen &&
                      setVerImagen({
                        abierto: true,
                        tipo: "png",
                        url: media?.url,
                      })
                    }
                  >
                    <div className="relative w-full h-full flex rounded-sm items-center justify-center">
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
              })}
        </div>
      </div>
    </div>
  );
};

export default Medios;
