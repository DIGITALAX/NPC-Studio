import { ModalContext } from "@/app/providers";
import { MainContentFocus, PageSize, Post } from "@lens-protocol/client";
import { fetchPosts } from "@lens-protocol/client/actions";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const useFeed = (perfil?: string) => {
  const contexto = useContext(ModalContext);
  const path = usePathname();
  const [comentariosAbiertos, setComentariosAbiertos] = useState<boolean[]>([]);
  const [feedCargando, setFeedCargando] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<{
    hasMore: boolean;
    paginated?: string | null;
  }>({
    hasMore: true,
    paginated: undefined,
  });
  const [feedActual, setFeedActual] = useState<Post[]>([]);

  const llamarFeed = async () => {
    if (!contexto?.clienteLens || Number(contexto?.escenas?.length) < 1) return;
    setFeedCargando(true);
    try {
      const data = await fetchPosts(
        contexto?.lensConectado?.sessionClient ?? contexto?.clienteLens,
        {
          pageSize: PageSize.Ten,

          filter: perfil
            ? {
                authors: [perfil],
              }
            : {
                metadata: {
                  tags: {
                    oneOf: [
                      // "npcStudio",
                      contexto?.escena?.replaceAll(" ", "")!,
                    ]?.filter(Boolean),
                  },
                  mainContentFocus: [
                    MainContentFocus.TextOnly,
                    MainContentFocus.Story,
                    MainContentFocus.Video,
                    MainContentFocus.Image,
                    MainContentFocus.Audio,
                  ],
                },
                //   authors: contexto?.escenas
                //     ?.find((esc) => esc?.clave == contexto?.escena)
                //     ?.sprites?.map((sp) => evmAddress(sp?.account_address)),
              },
        }
      );

      if (!data?.isOk()) {
        setFeedCargando(false);
        return;
      }

      setHasMore({
        hasMore: data?.value?.items?.length == 10,
        paginated: data?.value?.pageInfo?.next,
      });
      setFeedActual(data?.value?.items as Post[]);

      contexto?.setComentarPublicar(
        Array.from({ length: data?.value?.items?.length + 2 }, () => ({
          gifs: [],
          imagenes: [],
          videos: [],
          contenido: "",
        }))
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setFeedCargando(false);
  };

  const llamarMasFeed = async () => {
    if (!contexto?.clienteLens || !hasMore.hasMore || !hasMore.paginated)
      return;

    try {
      const data = await fetchPosts(
        contexto?.lensConectado?.sessionClient ?? contexto?.clienteLens,
        {
          pageSize: PageSize.Ten,
          filter: perfil
            ? {
                authors: [perfil],
              }
            : {
                metadata: {
                  mainContentFocus: [
                    MainContentFocus.TextOnly,
                    MainContentFocus.Story,
                    MainContentFocus.Video,
                    MainContentFocus.Image,
                    MainContentFocus.Audio,
                  ],
                  tags: {
                    oneOf: [
                      "npcStudio",
                      contexto?.escena?.replaceAll(" ", "")!,
                    ]?.filter(Boolean),
                  },
                },
                // authors: contexto?.escenas
                //   ?.find((esc) => esc?.clave == contexto?.escena)
                //   ?.sprites?.map((sp) => evmAddress(sp?.account_address)),
              },
          cursor: hasMore?.paginated,
        }
      );
      if (!data?.isOk()) {
        setFeedCargando(false);
        return;
      }

      setHasMore({
        hasMore: data?.value?.items?.length == 10,
        paginated: data?.value?.pageInfo?.next,
      });
      setFeedActual([...feedActual, ...(data?.value?.items as Post[])]);
      contexto?.setComentarPublicar([
        ...contexto?.comentarPublicar,
        ...Array.from({ length: data?.value?.items?.length }, () => ({
          gifs: [],
          imagenes: [],
          videos: [],
          contenido: "",
        })),
      ]);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (
      contexto?.clienteLens &&
      Number(contexto?.escenas?.length) > 0 &&
      contexto?.escena &&
      !path?.includes("agent")
    ) {
      llamarFeed();
    }
  }, [contexto?.clienteLens, contexto?.escenas?.length, contexto?.escena]);

  useEffect(() => {
    if (
      contexto?.clienteLens &&
      Number(feedActual?.length) < 1 &&
      path?.includes("agent") &&
      Number(contexto?.escenas?.length) > 0 &&
      perfil
    ) {
      llamarFeed();
    }
  }, [perfil, contexto?.escenas?.length]);

  return {
    feedCargando,
    hasMore,
    comentariosAbiertos,
    setComentariosAbiertos,
    feedActual,
    llamarMasFeed,
    llamarFeed,
  };
};

export default useFeed;
