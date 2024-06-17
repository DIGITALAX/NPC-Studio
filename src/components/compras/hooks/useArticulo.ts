import { AutographType, Coleccion } from "@/components/game/types/game.types";
import { useEffect, useState } from "react";
import { Catalogo, Compra } from "../types/compras.types";
import { getArticulo } from "../../../../graphql/autograph/queries/getArticulo";
import {
  ACCEPTED_TOKENS_AMOY,
  INFURA_GATEWAY,
  autographTypeToNumber,
  numberToAutograph,
} from "@/lib/constants";
import { getCatalogo } from "../../../../graphql/autograph/queries/getCatalogo";
import getDefaultProfile from "../../../../graphql/lens/queries/default";
import { Profile } from "../../../../graphql/generated";

const useArticulo = (
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        disenador: string;
        tipo: AutographType;
      }
    | undefined,
  lensConectado: Profile | undefined
) => {
  const [articuloCargando, setArticuloCargando] = useState<boolean>(false);
  const [articulosActuales, setArticulosActuales] = useState<
    Coleccion[] | Catalogo[] | undefined
  >();
  const [pagina, setPagina] = useState<number>(0);
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
        const prof = await getDefaultProfile(
          {
            for: datos?.data?.autographCreateds[0].designer,
          },
          lensConectado?.id
        );
        articulos = [
          {
            paginas: datos?.data?.autographCreateds[0].pages,
            tokenes: datos?.data?.autographCreateds[0].acceptedTokens,
            uri: datos?.data?.autographCreateds[0].uri,
            disenador: datos?.data?.autographCreateds[0].designer,
            precio: datos?.data?.autographCreateds[0].price,
            id: datos?.data?.autographCreateds[0].id,
            pubId: datos?.data?.autographCreateds[0].pubId,
            profileId: datos?.data?.autographCreateds[0].profileId,
            cantidad: datos?.data?.autographCreateds[0].amount,
            minteado: datos?.data?.autographCreateds[0].mintedTokens,
            paginasContadas: datos?.data?.autographCreateds[0].pageCount,
            profile: prof?.data?.defaultProfile as Profile,
            tipo: AutographType.Catalog,
          },
        ];
      } else {
        const datos = await getArticulo(
          manejarMostrarArticulo?.disenador!,
          autographTypeToNumber[manejarMostrarArticulo?.tipo as string]!
        );

        const prof = await getDefaultProfile(
          {
            for: manejarMostrarArticulo?.disenador,
          },
          lensConectado?.id
        );

        articulos = await Promise.all(
          datos?.data?.collections.map(async (col: any) => {
            if (!col.collectionMetadata) {
              const cadena = await fetch(
                `${INFURA_GATEWAY}/ipfs/${col.uri.split("ipfs://")?.[1]}`
              );
              col.collectionMetadata = await cadena.json();
            }

            return {
              galeria: col.collectionMetadata.gallery,
              imagen: col.collectionMetadata.image,
              id: col.collectionId,
              cantidad: col.amount,
              tokenes: col.acceptedTokens,
              tokenesMinteados: col.mintedTokens,
              precio: col.price,
              tipo: numberToAutograph[Number(col.type)],
              titulo: col.collectionMetadata.title,
              descripcion: col.collectionMetadata.description,
              etiquetas: col.collectionMetadata.tags,
              npcIdiomas: col.collectionMetadata.locales,
              npcInstrucciones: col.collectionMetadata.instructions,
              npcs: col.collectionMetadata.npcs,
              pubIds: col.pubIds,
              profileIds: col.profileIds,
              coleccionId: col.collectionId,
              galeriaId: col.galleryId,
              profile: prof?.data?.defaultProfile as Profile,
            };
          })
        );
      }

      setArticulosActuales(articulos);
      setArticuloSeleccionado(
        articulos.map((ar) => ({
          elemento: ar,
          token: ACCEPTED_TOKENS_AMOY[0][2],
          cantidad: 1,
          tipo: (ar as Coleccion)?.tipo,
          color: "",
          tamano: "",
        }))
      );
      setPagina(0);
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
    articuloCargando,
    articuloSeleccionado,
    setArticuloSeleccionado,
    articuloIndice,
    setArticuloIndice,
    pagina,
    setPagina,
  };
};

export default useArticulo;
