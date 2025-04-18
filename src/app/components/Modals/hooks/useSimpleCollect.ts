import { ModalContext } from "@/app/providers";
import { executePostAction } from "@lens-protocol/client/actions";
import { useContext, useEffect, useState } from "react";
import { Indexar } from "../../Common/types/common.types";
import pollResult from "@/app/lib/helpers/pollResult";

const useSimpleCollect = (dict: any) => {
  const contexto = useContext(ModalContext);
  const [simpleCollectCargando, setSimpleCollectCargando] =
    useState<boolean>(false);

  const hacerSimpleCollect = async () => {
    if (!contexto?.lensConectado?.sessionClient) return;
    setSimpleCollectCargando(true);
    try {
      const res = await executePostAction(
        contexto?.lensConectado?.sessionClient,
        {
          post: contexto?.simpleCollect?.post?.id,
          action: {
            simpleCollect: {
              selected: true,
            },
          },
        }
      );


      if (res.isErr()) {
        contexto?.setError?.(dict.Home.error);
        setSimpleCollectCargando(false);
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
          contexto?.setSimpleCollect({ open: false });
          contexto?.setIndexar(Indexar.Exito);
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
    },3000)
    setSimpleCollectCargando(false);
  };

  return {
    hacerSimpleCollect,
    simpleCollectCargando,
  };
};

export default useSimpleCollect;
