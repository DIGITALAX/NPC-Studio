import { ModalContext } from "@/app/providers";
import { useContext, useEffect, useState } from "react";

const useCollectConfig = (dict: any) => {
  const contexto = useContext(ModalContext);
  const [drops, setDrops] = useState<{
    award: string;
    whoCollectsOpen: boolean;
    creatorAwardOpen: boolean;
    currencyOpen: boolean;
    editionOpen: boolean;
    edition: string;
    timeOpen: boolean;
    time: string;
  }>({
    award: contexto?.comentarPublicar?.[contexto?.collectOptions?.index]
      ?.coleccionar?.payToCollect?.amount
      ? dict.Home.yes
      : "No",
    whoCollectsOpen: false,
    creatorAwardOpen: false,
    currencyOpen: false,
    editionOpen: false,
    edition: contexto?.comentarPublicar?.[contexto?.collectOptions?.index]
      ?.coleccionar?.collectLimit
      ? dict.Home.yes
      : "No",
    timeOpen: false,
    time: contexto?.comentarPublicar?.[contexto?.collectOptions?.index]
      ?.coleccionar?.endsAt
      ? dict.Home.yes
      : "No",
  });

  useEffect(() => {
    if (contexto?.collectOptions?.open) {
      setDrops({
        award: contexto?.comentarPublicar?.[contexto?.collectOptions?.index]
          ?.coleccionar?.payToCollect?.amount
          ? dict.Home.yes
          : "No",
        whoCollectsOpen: false,
        creatorAwardOpen: false,
        currencyOpen: false,
        editionOpen: false,
        edition: contexto?.comentarPublicar?.[contexto?.collectOptions?.index]
          ?.coleccionar?.collectLimit
          ? dict.Home.yes
          : "No",
        timeOpen: false,
        time: contexto?.comentarPublicar?.[contexto?.collectOptions?.index]
          ?.coleccionar?.endsAt
          ? dict.Home.yes
          : "No",
      });
    }
  }, [contexto?.collectOptions?.open]);

  return {
    drops,
    setDrops,
  };
};

export default useCollectConfig;
