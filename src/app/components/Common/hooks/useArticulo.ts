import {
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Account, evmAddress } from "@lens-protocol/client";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import {
  AutographType,
  Catalogo,
  Coleccion,
  Compra,
} from "../types/common.types";
import { ModalContext } from "@/app/providers";
import {
  autographTypeToNumber,
  INFURA_GATEWAY,
  numberToAutograph,
} from "@/app/lib/constants";
import { getCatalogo } from "../../../../../graphql/queries/getCatalogo";
import {
  getAll,
  getArticulo,
} from "../../../../../graphql/queries/getArticulo";

const useArticulo = (
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        disenadores: string[];
        tipo: AutographType;
      }
    | undefined
) => {
  const contexto = useContext(ModalContext);
  const [articuloCargando, setArticuloCargando] = useState<boolean>(false);
  const [articulosActuales, setArticulosActuales] = useState<
    Coleccion[] | Catalogo[] | undefined
  >();
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<Compra[]>(
    []
  );
  const [articuloIndice, setArticuloIndice] = useState<number>(0);

  const cargarArticulo = async (): Promise<void> => {
    setArticuloCargando(true);
    try {
      let articulos: Coleccion[] | Catalogo[] | undefined;

      if (manejarMostrarArticulo?.tipo == AutographType.Catalog) {
        const datos = await getCatalogo();

        const accounts = await fetchAccountsAvailable(
          contexto?.clienteLens ?? contexto?.lensConectado?.sessionClient!,
          {
            managedBy: evmAddress(datos?.data?.autographCreateds[0].designer),
            includeOwned: true,
          }
        );

        if (accounts.isErr()) {
          setArticuloCargando(false);
          return;
        }

        articulos = [
          {
            paginas: datos?.data?.autographCreateds[0].pages,
            tokenes: datos?.data?.autographCreateds[0].acceptedTokens,
            uri: datos?.data?.autographCreateds[0].uri,
            disenador: datos?.data?.autographCreateds[0].designer,
            precio: datos?.data?.autographCreateds[0].price,
            postId: datos?.data?.autographCreateds[0].postId,
            cantidad: datos?.data?.autographCreateds[0].amount,
            minteado: datos?.data?.autographCreateds[0].mintedTokens,
            paginasContadas: datos?.data?.autographCreateds[0].pageCount,
            profile: accounts.value.items?.[0]?.account,
            tipo: AutographType.Catalog,
          },
        ];
      } else {
        let datos: Coleccion[] = [];
        let profs: Account[] = [];

        await Promise.all(
          manejarMostrarArticulo!?.disenadores?.map(
            async (disenador: string) => {
              if (manejarMostrarArticulo?.tipo == AutographType.All) {
                const valores = await getAll(disenador);
                datos.push(...(valores?.data?.collections || []));
                const accounts = await fetchAccountsAvailable(
                  contexto?.clienteLens ??
                    contexto?.lensConectado?.sessionClient!,
                  {
                    managedBy: evmAddress(disenador),
                    includeOwned: true,
                  }
                );

                if (accounts.isErr()) {
                  setArticuloCargando(false);
                  return;
                }

                profs.push(
                  ...(Array.from({
                    length: valores?.data?.collections?.length,
                  }).fill(accounts.value.items?.[0]?.account) as Account[])
                );
              } else {
              
                const valores = await getArticulo(
                  disenador!,
                  autographTypeToNumber[manejarMostrarArticulo?.tipo as string]!
                );
                datos.push(...(valores?.data?.collections || []));
                const accounts = await fetchAccountsAvailable(
                  contexto?.clienteLens ??
                    contexto?.lensConectado?.sessionClient!,
                  {
                    managedBy: evmAddress(disenador),
                    includeOwned: true,
                  }
                );

                if (accounts.isErr()) {
                  setArticuloCargando(false);
                  return;
                }

                profs.push(
                  ...(Array.from({
                    length: valores?.data?.collections?.length,
                  }).fill(accounts.value.items?.[0]?.account) as Account[])
                );
              }
            }
          )
        );

        articulos = (await Promise.all(
          datos.map(async (col: any, indice: number) => {
            if (!col.metadata) {
              const cadena = await fetch(
                `${INFURA_GATEWAY}/ipfs/${col.uri.split("ipfs://")?.[1]}`
              );
              col.metadata = await cadena.json();
            }

            return {
              id: col.collectionId,
              cantidad: col.amount,
              tokenes: col.acceptedTokens,
              tokenesMinteados: col.mintedTokenIds,
              precio: Number(col.price),
              tipo: numberToAutograph[Number(col.type)],
              titulo: col.metadata?.title,
              descripcion: col.metadata?.description,
              etiquetas: col.metadata?.tags,
              imagenes: col.metadata?.images,
              npcs: col.metadata?.npcs,
              postIds: col.postIds,
              coleccionId: col.collectionId,
              galeriaId: col.galleryId,
              profile: profs[indice],
            };
          })
        )) as any;
      }

      setArticulosActuales(articulos);

      setArticuloSeleccionado(
        (articulos || [])?.map((ar) => ({
          elemento: ar,
          token: ar.tokenes?.[0],
          cantidad: 1,
          tipo: (ar as Coleccion)?.tipo,
          color:
            (ar as Coleccion)?.tipo == AutographType.Hoodie ||
            (ar as Coleccion)?.tipo == AutographType.Shirt ||
            (ar as Coleccion)?.tipo == AutographType.All
              ? "black"
              : "",
          tamano:
            (ar as Coleccion)?.tipo == AutographType.Hoodie ||
            (ar as Coleccion)?.tipo == AutographType.Shirt ||
            (ar as Coleccion)?.tipo == AutographType.All
              ? "m"
              : "",
        }))
      );

      setArticuloIndice(0);
    } catch (err: any) {
      console.error(err.message);
    }
    setArticuloCargando(false);
  };

  useEffect(() => {
    if (manejarMostrarArticulo) {
      cargarArticulo();
    } else {
      setArticulosActuales(undefined);
    }
  }, [manejarMostrarArticulo]);

  return {
    articulosActuales,
    articuloSeleccionado,
    setArticuloSeleccionado,
    articuloIndice,
    setArticuloIndice,
    articuloCargando,
  };
};

export default useArticulo;
