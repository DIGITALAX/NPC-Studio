import { v4 as uuidv4 } from "uuid";
import { PublicationMetadataMainFocusType } from "../../../graphql/generated";
import convertirArchivo from "./convertirArchivo";

const subirContenido = async (
  contentText: string | undefined,
  images: {
    medios: string;
    tipo: string;
  }[],
  videos: string[],
  gifs: string[],
  sceneKey: string
): Promise<string | undefined> => {
  let $schema: string,
    mainContentFocus: PublicationMetadataMainFocusType,
    value: object = {},
    coverJSON: string | undefined;

  if (images?.length < 1 && gifs?.length < 1 && videos?.length < 1) {
    $schema = "https://json-schemas.lens.dev/publications/text-only/3.0.0.json";
    mainContentFocus = PublicationMetadataMainFocusType.TextOnly;
  } else {
    const cleanedGifs = images
      ?.map((item) => {
        if (item.tipo !== "image/png") {
          return item.medios;
        }
      })
      ?.filter(Boolean);
    const cleanedImages = images
      ?.map((item) => {
        if (item?.tipo !== "image/gif") {
          return item.medios;
        }
      })
      ?.filter(Boolean);

    const mediaWithKeys = [
      ...(videos || []).map((video) => ({
        type: "video/mp4",
        item: video?.includes("ipfs://")
          ? video
          : convertirArchivo(video, "video/mp4"),
      })),
      ...(cleanedImages || []).map((image) => ({
        type: "image/png",
        item:
          image &&
          (image?.includes("ipfs://")
            ? image
            : convertirArchivo(image, "image/png")),
      })),
      ...[...(gifs || []), ...(cleanedGifs || [])].map((gif) => ({
        type: "image/gif",
        item: gif,
      })),
    ]
      ?.filter(Boolean)
      ?.filter((item) => item.item);

    const uploads = await Promise.all(
      mediaWithKeys.map(async (medios) => {
        if (
          typeof medios?.item == "string" &&
          ((medios?.item as String)?.includes("ipfs://") ||
            (medios?.item as String)?.includes("https://media.tenor.com"))
        ) {
          return { type: medios?.type, item: medios?.item };
        } else {
          const response = await fetch("/api/ipfs", {
            method: "POST",
            body: medios.item,
          });
          const responseJSON = await response.json();
          return { type: medios?.type, item: "ipfs://" + responseJSON.cid };
        }
      })
    );

    const primaryMedia = uploads[0];
    if (primaryMedia?.type === "video/mp4") {
      $schema = "https://json-schemas.lens.dev/publications/video/3.0.0.json";
      mainContentFocus = PublicationMetadataMainFocusType.Video;
      value = {
        video: {
          ...primaryMedia,
          cover: coverJSON ? coverJSON : undefined,
        },
      };
    } else {
      $schema = "https://json-schemas.lens.dev/publications/image/3.0.0.json";
      mainContentFocus = PublicationMetadataMainFocusType.Image;
      value = { image: primaryMedia };
    }

    const attachments = uploads.filter(
      (medios) => medios.item !== primaryMedia.item
    );

    if (attachments?.length > 0) {
      value = {
        ...value,
        attachments: attachments,
      };
    }
  }

  try {
    const loadedCover = await fetch("/api/ipfs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        $schema,
        lens: {
          mainContentFocus,
          title:
            contentText && contentText?.trim() !== ""
              ? contentText.slice(0, 20)
              : undefined,
          content:
            contentText && contentText?.trim() !== "" ? contentText : undefined,
          appId: "npcStudio",
          ...value,
          id: uuidv4(),
          hideFromFeed: false,
          locale: "en",
          tags: ["npcStudio", sceneKey],
        },
      }),
    });
    const res = await loadedCover.json();

    return "ipfs://" + res?.cid;
  } catch (err: any) {
    console.error(err.message);
  }
};

export default subirContenido;
