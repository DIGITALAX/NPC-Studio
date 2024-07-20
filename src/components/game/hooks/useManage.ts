import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import Draggable from "react-draggable";
import { AutographType, ComentarPublicar, Escena } from "../types/game.types";
import {
  Post,
  Profile,
  SimpleCollectOpenActionSettings,
} from "../../../../graphql/generated";
import subirContenido from "@/lib/helpers/subirContenido";
import { PublicClient, createWalletClient, custom } from "viem";
import { polygon } from "viem/chains";
import { Indexar } from "@/components/common/types/common.types";
import publicarLens from "@/lib/helpers/publicarLens";
import approveCurrency from "../../../../graphql/lens/mutations/approve";
import lensColeccionar from "@/lib/helpers/lensColeccionar";

const useManage = (
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  lensConectado: Profile | undefined,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  citaAbierta: Post | undefined,
  setAbrirCita: (e: SetStateAction<Post | undefined>) => void,
  seguirColeccionar:
    | {
        tipo: string;
        collecionar: {
          id: string;
          stats: number;
          item: SimpleCollectOpenActionSettings;
        };
        seguidor: Profile;
      }
    | undefined,
  setSeguirColeccionar: (
    e:
      | {
          tipo: string;
          collecionar: {
            id: string;
            stats: number;
            item: SimpleCollectOpenActionSettings;
          };
          seguidor: Profile;
        }
      | undefined
  ) => void,
  escenas: Escena[]
) => {
  const elementoTextoCita = useRef<HTMLTextAreaElement>();
  const [escena, setEscena] = useState<string>(escenas?.[0]?.clave);
  const [npc, setNpc] = useState<string | undefined>(
    escenas?.[0]?.sprites?.[0]?.etiqueta
  );
  const [cargando, setCargando] = useState<boolean>(true);
  const [manejarMostrarArticulo, setManejarMostrarArticulo] = useState<{
    etiqueta: string;
    tipo: AutographType;
    disenador: string;
  }>();
  const wrapperRef = useRef<Draggable | null>(null);
  const [dragDialog, setDragDialog] = useState<boolean>(false);
  const [citaCargando, setCitaCargando] = useState<boolean>(false);
  const [aprobado, setAprobado] = useState<boolean>(false);
  const [cargandoColeccion, setCargandoColeccion] = useState<boolean>(false);
  const [indiceConversacionActual, setIndiceConversacionActual] =
    useState<number>(0);
  const [citaPublicar, setCitaPublicar] = useState<ComentarPublicar[]>([
    {
      contenido: "",
      imagenes: [],
      videos: [],
      gifs: [],
    },
  ]);
  const [perfilesAbiertosCita, setPerfilesAbiertosCita] = useState<boolean[]>([
    false,
  ]);
  const [mencionarPerfilesCita, setMencionarPerfilesCita] = useState<Profile[]>(
    []
  );
  const [caretCoordCita, setCaretCoordCita] = useState<
    {
      x: number;
      y: number;
    }[]
  >([{ x: 0, y: 0 }]);

  const manejarArchivoCita = (
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
          const nuevosVideos = [...(citaPublicar?.[indice]?.videos || [])];
          nuevosVideos.push(e.target?.result as string);
          objeto = {
            videos: nuevosVideos,
          };
        } else {
          const nuevasImagenes = [...(citaPublicar?.[indice]?.imagenes || [])];
          nuevasImagenes.push({
            tipo: "image/png",
            medios: e.target?.result as string,
          });
          objeto = {
            imagenes: nuevasImagenes,
          };
        }

        setCitaPublicar((prev) => {
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

  const hacerCita = async () => {
    if (
      !citaPublicar[0]?.contenido &&
      !citaPublicar[0]?.imagenes &&
      !citaPublicar[0]?.videos
    )
      return;
    setCitaCargando(true);
    try {
      const contentURI = await subirContenido(
        citaPublicar[0]?.contenido?.trim() == ""
          ? " "
          : citaPublicar[0]?.contenido,
        citaPublicar[0]?.imagenes || [],
        citaPublicar[0]?.videos || [],
        citaPublicar[0]?.gifs || [],
        escena
      );

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await publicarLens(
        contentURI!,
        citaPublicar[0]?.coleccionar
          ? [
              {
                collectOpenAction: {
                  simpleCollectOpenAction: citaPublicar[0]?.coleccionar,
                },
              },
            ]
          : undefined,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion,
        () => setCitaCargando(false),
        citaAbierta?.id,
        false,
        true
      );
      setCitaPublicar([
        {
          contenido: "",
          imagenes: [],
          videos: [],
          gifs: [],
        },
      ]);
      setAbrirCita(undefined);
    } catch (err: any) {
      if (
        !err?.messages?.includes("Block at number") &&
        !err?.message?.includes("could not be found")
      ) {
        setErrorInteraccion(true);
        console.error(err.message);
      } else {
        setIndexar(Indexar.Exito);

        setTimeout(() => {
          setIndexar(Indexar.Inactivo);
        }, 3000);
      }
    }
    setCitaCargando(false);
  };

  const aprobar = async () => {
    setCargandoColeccion(true);
    try {
      const { data } = await approveCurrency({
        allowance: {
          currency:
            seguirColeccionar?.collecionar?.item?.amount?.asset.contract
              .address!,
          value: seguirColeccionar?.collecionar?.item?.amount?.value!,
        },
        module: {
          openActionModule:
            !seguirColeccionar?.collecionar?.item?.followerOnly ||
            (seguirColeccionar?.collecionar?.item?.followerOnly &&
              seguirColeccionar?.seguidor?.operations?.isFollowedByMe?.value)
              ? seguirColeccionar?.collecionar?.item?.type
              : undefined,
          followModule:
            seguirColeccionar?.collecionar?.item?.followerOnly &&
            !seguirColeccionar?.seguidor?.operations?.isFollowedByMe?.value
              ? seguirColeccionar?.seguidor?.followModule?.type
              : undefined,
        },
      });

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const res = await clientWallet.sendTransaction({
        to: data?.generateModuleCurrencyApprovalData?.to as `0x${string}`,
        account: data?.generateModuleCurrencyApprovalData
          ?.from as `0x${string}`,
        data: data?.generateModuleCurrencyApprovalData?.data,
        value: BigInt("0"),
      });
      await publicClient.waitForTransactionReceipt({ hash: res });
      setAprobado(true);
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoColeccion(false);
  };

  const manejarColeccionar = async () => {
    if (
      Number(seguirColeccionar?.collecionar?.item?.collectLimit) ==
        Number(seguirColeccionar?.collecionar?.stats) &&
      Number(seguirColeccionar?.collecionar?.item?.collectLimit || 0) > 0
    )
      return;
    if (!lensConectado?.id) return;

    setCargandoColeccion(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensColeccionar(
        seguirColeccionar?.collecionar?.id!,
        seguirColeccionar?.collecionar?.item?.__typename!,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion
      );

      setSeguirColeccionar(undefined);
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoColeccion(false);
  };

  return {
    npc,
    setNpc,
    escena,
    setEscena,
    cargando,
    citaCargando,
    setCargando,
    setManejarMostrarArticulo,
    manejarMostrarArticulo,
    wrapperRef,
    dragDialog,
    setDragDialog,
    indiceConversacionActual,
    setIndiceConversacionActual,
    hacerCita,
    citaPublicar,
    setCitaPublicar,
    mencionarPerfilesCita,
    setCaretCoordCita,
    setMencionarPerfilesCita,
    setPerfilesAbiertosCita,
    manejarArchivoCita,
    perfilesAbiertosCita,
    caretCoordCita,
    elementoTextoCita,
    aprobado,
    aprobar,
    cargandoColeccion,
    manejarColeccionar,
  };
};

export default useManage;
