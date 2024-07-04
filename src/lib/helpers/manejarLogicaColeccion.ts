import { SetStateAction } from "react";
import { OpenActionModule, Post, Profile, SimpleCollectOpenActionSettings } from "../../../graphql/generated";

const manejarLogicaColeccion = (
  pub: Post,
  cargador: boolean,
  indice: number,
  coleccion:
    | ((id: string, tipo: string, indice: number) => Promise<void>)
    | undefined,
  setSeguirColeccionar: (
    e: SetStateAction<{
      tipo: string;
      collecionar: {
        id: string;
        stats: number;
        item: SimpleCollectOpenActionSettings;
      };
      seguidor: Profile;
    } | undefined>
  ) => void
): void => {
  if (
    cargador ||
    (pub?.openActionModules?.[0]?.__typename !==
      "SimpleCollectOpenActionSettings" &&
      pub?.openActionModules?.[0]?.__typename !==
        "MultirecipientFeeCollectOpenActionSettings") ||
    !coleccion
  )
    return;

  Number(pub?.openActionModules?.[0]?.amount?.value) > 0 ||
  pub?.openActionModules?.[0]?.endsAt != null ||
  Number(pub.openActionModules?.[0]?.collectLimit) > 0 ||
  pub?.openActionModules?.[0]?.followerOnly
    ? setSeguirColeccionar({
        tipo: "collect",
        collecionar: {
          id: pub?.id,
          stats: pub.stats.countOpenActions,
          item: pub?.openActionModules?.[0] as SimpleCollectOpenActionSettings,
        },
        seguidor: pub?.by,
      })
    : coleccion!(pub?.id, pub?.openActionModules?.[0]?.__typename, indice);
};

export default manejarLogicaColeccion;
