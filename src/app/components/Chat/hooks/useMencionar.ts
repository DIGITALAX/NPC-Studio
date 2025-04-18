import { Account, evmAddress } from "@lens-protocol/client";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { ModalContext } from "@/app/providers";
import pollResult from "@/app/lib/helpers/pollResult";
import { immutable } from "@lens-chain/storage-client";
import { chains } from "@lens-chain/sdk/viem";
import { post as createPost } from "@lens-protocol/client/actions";
import convertirArchivo from "@/app/lib/helpers/convertirArchivo";
import {
  image,
  video,
  textOnly,
  MediaVideoMimeType,
  MediaImageMimeType,
} from "@lens-protocol/metadata";
import { Indexar } from "../../Common/types/common.types";
const useMencionar = (
  dict: any,
  address: `0x${string}` | undefined,
  llamarFeed?: () => Promise<void>
) => {
  const contexto = useContext(ModalContext);
  const [publicacionCargando, setPublicacionCargando] =
    useState<boolean>(false);
  const elementoTexto = useRef<HTMLTextAreaElement | null>(null);
  const [perfilesAbiertos, setPerfilesAbiertos] = useState<boolean[]>([]);
  const [mencionarPerfiles, setMencionarPerfiles] = useState<Account[]>([]);
  const [caretCoord, setCaretCoord] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);

  const manejarArchivo = (
    e: ChangeEvent<HTMLInputElement>,
    tipo: string,
    indice: number
  ): void => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        let objeto: Object = {};

        if (tipo == "video") {
          const nuevosVideos = [
            ...(contexto?.comentarPublicar?.[indice]?.videos || []),
          ];
          nuevosVideos.push(e.target?.result as string);
          objeto = {
            videos: nuevosVideos,
          };
        } else {
          const nuevasImagenes = [
            ...(contexto?.comentarPublicar?.[indice]?.imagenes || []),
          ];
          nuevasImagenes.push({
            tipo: "image/png",
            medios: e.target?.result as string,
          });
          objeto = {
            imagenes: nuevasImagenes,
          };
        }
        contexto?.setComentarPublicar((prev) => {
          const arr = [...prev];
          arr[indice] = {
            ...arr[indice],
            ...objeto,
          };
          return arr;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const manejarPublicar = async (
    indice: number,
    comentarioId?: string,
    cita?: boolean
  ) => {
    if (!contexto?.lensConectado?.sessionClient) {
      return;
    }

    if (
      contexto?.comentarPublicar?.[indice]?.contenido?.trim() == "" &&
      contexto?.comentarPublicar?.[indice]?.imagenes?.length < 1 &&
      contexto?.comentarPublicar?.[indice]?.videos?.length < 1 &&
      contexto?.comentarPublicar?.[indice]?.gifs?.length < 1
    )
      return;
    setPublicacionCargando(true);
    try {
      const acl = immutable(chains.mainnet.id);
      let schema;

      if (
        contexto?.comentarPublicar?.[indice]?.imagenes?.length < 1 &&
        contexto?.comentarPublicar?.[indice]?.gifs?.length < 1 &&
        contexto?.comentarPublicar?.[indice]?.videos?.length < 1
      ) {
        schema = textOnly({
          content: contexto?.comentarPublicar?.[indice]?.contenido!,
          tags: ["npcStudio", contexto?.escena?.replaceAll(" ", "")]?.filter(
            Boolean
          ) as string[],
        });
      } else {
        let videos, images;
        if (contexto?.comentarPublicar?.[indice]?.videos?.length > 0) {
          videos = [
            ...(await Promise.all(
              contexto?.comentarPublicar?.[indice]?.videos?.map(
                async (video) => {
                  const res = await fetch("/api/ipfs", {
                    method: "POST",
                    body: convertirArchivo(video, "video/mp4"),
                  });
                  const json = await res.json();

                  return {
                    type: MediaVideoMimeType.MP4,
                    item: "ipfs://" + json?.cid,
                  };
                }
              )
            )),
          ];
        }

        if (
          contexto?.comentarPublicar?.[indice]?.imagenes?.length > 0 ||
          contexto?.comentarPublicar?.[indice]?.gifs?.length > 0
        ) {
          images = [
            ...(await Promise.all(
              (contexto?.comentarPublicar?.[indice]?.imagenes || [])?.map(
                async (image) => {
                  const res = await fetch("/api/ipfs", {
                    method: "POST",
                    body: convertirArchivo(image.medios, image.tipo),
                  });
                  const json = await res.json();

                  return {
                    type: MediaImageMimeType.PNG,
                    item: "ipfs://" + json?.cid,
                  };
                }
              )
            )),
            ...(contexto?.comentarPublicar?.[indice]?.gifs || [])?.map(
              (gif) => ({
                type: MediaImageMimeType.GIF,
                item: gif,
              })
            ),
          ];
        }

        if (contexto?.comentarPublicar?.[indice]?.videos?.length > 0) {
          schema = video({
            content: contexto?.comentarPublicar?.[indice]?.contenido!,
            tags: ["npcStudio", contexto?.escena?.replaceAll(" ", "")]?.filter(
              Boolean
            ) as string[],
            video: videos?.[0]!,
            attachments:
              (videos || [])?.filter((_, i) => i !== 0)?.length < 1 &&
              (images || [])?.length < 1
                ? undefined
                : [
                    ...(videos || [])?.filter((_, i) => i !== 0),
                    ...(images || []),
                  ],
          });
        } else {
          schema = image({
            content: contexto?.comentarPublicar?.[indice]?.contenido!,
            tags: ["npcStudio", contexto?.escena?.replaceAll(" ", "")]?.filter(
              Boolean
            ) as string[],
            image: images?.[0]!,
            attachments:
              (images || [])?.filter((_, i) => i !== 0)?.length < 1 &&
              (videos || [])?.length < 1
                ? undefined
                : [
                    ...(images || [])?.filter((_, i) => i !== 0),
                    ...(videos || []),
                  ],
          });
        }
      }

      const { uri } = await contexto?.clienteAlmacenamiento?.uploadAsJson(
        schema,
        { acl }
      )!;

      let actions = {};
      if (contexto?.comentarPublicar?.[indice]?.coleccionar) {
        let payToCollect = contexto?.comentarPublicar?.[indice]?.coleccionar
          ?.payToCollect
          ? {
              ...contexto?.comentarPublicar?.[indice]?.coleccionar
                ?.payToCollect,
              recipients: [{ address: evmAddress(address!), percent: 100 }],
            }
          : null;
        actions = {
          actions: [
            {
              simpleCollect: {
                ...contexto?.comentarPublicar?.[indice]?.coleccionar,
                payToCollect,
              },
            },
          ],
        };
      }
      const res = await createPost(contexto?.lensConectado?.sessionClient!, {
        contentUri: uri,
        quoteOf:
          cita && comentarioId
            ? {
                post: comentarioId,
              }
            : undefined,
        commentOn:
          comentarioId && !cita
            ? {
                post: comentarioId,
              }
            : undefined,
        ...actions,
      });

      if (res.isErr()) {
        contexto?.setError?.(dict.Home.error);
        setPublicacionCargando(false);
        return;
      }

      if ((res.value as any)?.reason?.includes("Signless")) {
        contexto?.setSignless?.(true);
      } else if ((res.value as any)?.hash) {
        contexto?.setIndexar(Indexar.Indexando);
        if (
          await pollResult(
            (res.value as any)?.hash,
            contexto?.lensConectado?.sessionClient!
          )
        ) {
          contexto?.setComentarPublicar((prev) => {
            let arr = [...(prev || [])];

            arr[indice] = { contenido: "", imagenes: [], videos: [], gifs: [] };

            return arr;
          });
          contexto?.setIndexar(Indexar.Exito);
          contexto?.setCitaAbierta({
            open: false,
          });
        } else {
          contexto?.setError?.(dict.Home.error1);
        }
      } else {
        contexto?.setError?.(dict.Home.error1);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setTimeout(() => {
      contexto?.setIndexar(Indexar.Inactivo);
    }, 3000);
    llamarFeed && (await llamarFeed());
    setPublicacionCargando(false);
  };

  return {
    setCaretCoord,
    caretCoord,
    perfilesAbiertos,
    setPerfilesAbiertos,
    setMencionarPerfiles,
    mencionarPerfiles,
    elementoTexto,
    manejarArchivo,
    publicacionCargando,
    manejarPublicar,
  };
};

export default useMencionar;
