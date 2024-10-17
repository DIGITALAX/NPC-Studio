import { SetStateAction, useEffect, useState } from "react";
import {
  Desafiante,
  EspectadorInfo,
  Info,
  Pantalla,
  TokensGuardados,
} from "../types/agentes.types";
import { Atributos } from "@/components/post/types/post.types";
import getPublications from "../../../../graphql/lens/queries/publications";
import {
  LimitType,
  Post,
  Profile,
  PublicationType,
} from "../../../../graphql/generated";
import { INFURA_GATEWAY, NPC_RENT } from "@/lib/constants";
import { manejarJSON } from "@/lib/helpers/manejarJSON";
import { Dictionary, Escena, Sprite } from "@/components/game/types/game.types";
import getProfiles from "../../../../graphql/lens/queries/profiles";
import { getNPCInformacionTodo } from "../../../../graphql/npc/queries/getNPCInformacion";
import { getEspectadorInformacion } from "../../../../graphql/npc/queries/getInfoEspectador";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygonAmoy } from "viem/chains";
import NPCRent from "./../../../../abis/NPCRent.json";
import { getNPCRentTodo } from "../../../../graphql/npc/queries/getNPCRentTodo";
import {
  getLeaderboardNPC,
  getLeaderboardSpectator,
} from "../../../../graphql/npc/queries/getLeaderboard";
import getDefaultProfile from "../../../../graphql/lens/queries/default";

const useAgentes = (
  lensConectado: Profile | undefined,
  setEscenas: (e: SetStateAction<Escena[]>) => void,
  escenas: Escena[],
  publicClient: PublicClient,
  address: `0x${string}`,
  setVoto: (
    e: SetStateAction<
      | {
          mensaje: string;
          tokens?: {
            titulo: string;
            enlace: string;
            tapa: string;
            cantidad: number;
            umbral: number;
          }[];
        }
      | undefined
    >
  ) => void,
  dict: Dictionary
) => {
  const [pantallaCambio, setPantallaCambio] = useState<Pantalla>(
    Pantalla.Puntaje
  );
  const [espectadorInfoLoading, setEspectadorInfoLoading] =
    useState<boolean>(false);
  const [espectadorInfo, setEspectadorInfo] = useState<EspectadorInfo>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pantalla, setPantalla] = useState(window.innerWidth > 1280);
  const [atributos, setAtributos] = useState<Atributos>();
  const [todosLosNPCs, setTodosLosNPCs] = useState<Sprite[]>([]);
  const [npcsCargando, setNPCsCargando] = useState<boolean>(false);
  const [mostrarMas, setMostrarMas] = useState<boolean>(false);
  const [informacion, setInformacion] = useState<Info[]>([]);
  const [cogerCargando, setCogerCargando] = useState<boolean>(false);
  const [tokensGuardados, setTokenesGuardados] = useState<TokensGuardados>();
  const [desafiantes, setDesafiantes] = useState<Desafiante[]>([]);
  const [todosLosDesafiantes, setTodosLosDesafiantes] = useState<Desafiante[]>(
    []
  );
  const [tabla, setTabla] = useState<
    {
      perfil: Profile | undefined;
      totalScore: number;
      weeklyScore: number;
      tipo: number;
      totalAU: number;
    }[]
  >([]);

  const manejarCoger = async (): Promise<void> => {
    setCogerCargando(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      const semana = await publicClient.readContract({
        address: NPC_RENT,
        abi: NPCRent,
        functionName: "weekCounter",
        account: address,
      });

      const { request } = await publicClient.simulateContract({
        address: NPC_RENT,
        abi: NPCRent,
        functionName: "spectatorClaimAU",
        chain: polygonAmoy,
        args: ["0x", true, semana],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      setVoto({
        mensaje: dict.Home.auClaimed,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setCogerCargando(false);
  };

  const llamarAtributos = async (): Promise<void> => {
    try {
      const datos = await getPublications(
        {
          limit: LimitType.Ten,
          where: {
            publicationTypes: [PublicationType.Post],
            metadata: {
              publishedOn: ["npcStudio"],
            },
          },
        },
        lensConectado?.id
      );

      const atro = (
        datos?.data?.publications?.items?.[0] as Post
      )?.metadata?.attributes?.find(
        (at) => at.key?.toLowerCase() == "llm_info"
      )!?.value;

      if (atro) {
        const cadena = await fetch(
          `${INFURA_GATEWAY}/ipfs/${atro.split("ipfs://")?.[1]}`
        );

        const json = await cadena.json();

        if (json.version) {
          setAtributos({
            ...json,
            options: {
              ...json?.options,
              tokenizer: json?.options?.tokenizer || "Default",
            },
            model: json?.options?.model || "Llama3.1:8b",
            mensaje: {
              ...json?.mensaje,
              token_means_respuesta: await manejarJSON(
                json?.mensaje?.token_means_respuesta
              ),
              k_means_respuesta: await manejarJSON(
                json?.mensaje?.k_means_respuesta
              ),
              v_means_respuesta: await manejarJSON(
                json?.mensaje?.v_means_respuesta
              ),
              value_std_devs_respuesta: await manejarJSON(
                json?.mensaje?.value_std_devs_respuesta
              ),
              value_maxs_respuesta: await manejarJSON(
                json?.mensaje?.value_maxs_respuesta
              ),
              value_mins_respuesta: await manejarJSON(
                json?.mensaje?.value_mins_respuesta
              ),
              key_std_devs_respuesta: await manejarJSON(
                json?.mensaje?.key_std_devs_respuesta
              ),
              key_maxs_respuesta: await manejarJSON(
                json?.mensaje?.key_maxs_respuesta
              ),
              key_mins_respuesta: await manejarJSON(
                json?.mensaje?.key_mins_respuesta
              ),
              ffn_out_std_devs: await manejarJSON(
                json?.mensaje?.ffn_out_std_devs
              ),
              ffn_out_maxs: await manejarJSON(json?.mensaje?.ffn_out_maxs),
              ffn_out_mins: await manejarJSON(json?.mensaje?.ffn_out_mins),
              ffn_out_means: await manejarJSON(json?.mensaje?.ffn_out_means),
              ffn_inp_std_devs: await manejarJSON(
                json?.mensaje?.ffn_inp_std_devs
              ),
              ffn_inp_maxs: await manejarJSON(json?.mensaje?.ffn_inp_maxs),
              ffn_inp_mins: await manejarJSON(json?.mensaje?.ffn_inp_mins),
              ffn_inp_means: await manejarJSON(json?.mensaje?.ffn_inp_means),
            },
          });
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const cogerInfoEspectador = async () => {
    setEspectadorInfoLoading(true);
    try {
      const datos = await getEspectadorInformacion(
        lensConectado?.ownedBy?.address
      );
      setEspectadorInfo(datos?.data?.spectatorInfo);

      setTokenesGuardados({
        mona: await publicClient.readContract({
          address: "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address],
          account: address,
          functionName: "balanceOf",
        }),
        delta: await publicClient.readContract({
          address: "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address],
          account: address,
          functionName: "balanceOf",
        }),
        fashion: await publicClient.readContract({
          address: "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address],
          account: address,
          functionName: "balanceOf",
        }),
        pode: await publicClient.readContract({
          address: "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address],
          account: address,
          functionName: "balanceOf",
        }),
        genesis: await publicClient.readContract({
          address: "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address],
          account: address,
          functionName: "balanceOf",
        }),
        au: await publicClient.readContract({
          address: "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address],
          account: address,
          functionName: "balanceOf",
        }),
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setEspectadorInfoLoading(false);
  };

  const llamaNPC = async () => {
    setNPCsCargando(true);
    try {
      const sprites = escenas?.flatMap((e) => e.sprites);

      const datos = await getProfiles(
        {
          where: {
            profileIds: sprites?.flatMap(
              (a) => "0x0" + a?.perfil_id?.toString(16)?.split("0x")?.[1]
            ),
          },
        },
        lensConectado?.id
      );

      const data = await getNPCInformacionTodo();

      const info = sprites?.map((sprite) => {
        let perfil = datos?.data?.profiles?.items?.find(
          (per) =>
            per.id == "0x0" + sprite?.perfil_id?.toString(16)?.split("0x")?.[1]
        ) as Profile;
        return {
          perfil,
          auEarnedTotal: data?.data?.npcInfos?.find(
            (npc: any) =>
              npc.npc?.toLowercase() == perfil?.ownedBy?.address?.toLowerCase()
          )?.auEarnedTotal,
          auPaidTotal: data?.data?.npcInfos?.find(
            (npc: any) =>
              npc.npc?.toLowercase() == perfil?.ownedBy?.address?.toLowerCase()
          )?.auPaidTotal,
          activeJobs: data?.data?.npcInfos?.find(
            (npc: any) =>
              npc.npc?.toLowercase() == perfil?.ownedBy?.address?.toLowerCase()
          )?.activeJobs,
          currentWeeklyScore: data?.data?.npcInfos?.find(
            (npc: any) =>
              npc.npc?.toLowercase() == perfil?.ownedBy?.address?.toLowerCase()
          )?.currentWeeklyScore,
          currentGlobalScore: data?.data?.npcInfos?.find(
            (npc: any) =>
              npc.npc?.toLowercase() == perfil?.ownedBy?.address?.toLowerCase()
          )?.currentGlobalScore,
          allGlobalScore: data?.data?.npcInfos?.find(
            (npc: any) =>
              npc.npc?.toLowercase() == perfil?.ownedBy?.address?.toLowerCase()
          )?.allGlobalScore,
          activeWeeks: data?.data?.npcInfos?.find(
            (npc: any) =>
              npc.npc?.toLowercase() == perfil?.ownedBy?.address?.toLowerCase()
          )?.activeWeeks,
          rentMissedTotal: data?.data?.npcInfos?.find(
            (npc: any) =>
              npc.npc?.toLowercase() == perfil?.ownedBy?.address?.toLowerCase()
          )?.rentMissedTotal,
        };
      });

      const alquileres = await getNPCRentTodo();

      const todosNPCs = await getLeaderboardNPC();
      const spectators = await getLeaderboardSpectator();

      setTodosLosNPCs(sprites);
      setInformacion(info);
      setDesafiantes([
        {
          ...sprites[0],
          ...info[0],
          rentTransactions: alquileres?.data?.rentPaidNPCs?.find(
            (al: any) => al.npc == sprites[0].billetera
          ),
        },
        {
          ...sprites[1],
          ...info[1],
          rentTransactions: alquileres?.data?.rentPaidNPCs?.find(
            (al: any) => al.npc == sprites[1].billetera
          ),
        },
      ]);
      setTodosLosDesafiantes(
        sprites?.map((spr, i) => ({
          ...spr,
          ...info[i],
          rentTransactions: alquileres?.data?.rentPaidNPCs?.find(
            (al: any) => al.npc == spr.billetera
          ),
        }))
      );

      const cachePerfiles: { [spectator: string]: any } = {};
      const specs = await Promise.all(
        spectators?.data?.leaderboardSpectators?.map(async (spec: any) => {
          let perfil;
          if (cachePerfiles[spec?.spectator]) {
            perfil = cachePerfiles[spec?.spectator];
          } else {
            perfil = await getDefaultProfile(
              {
                for: spec?.spectator,
              },
              lensConectado?.id
            );
            cachePerfiles[spec?.spectator] = perfil?.data?.defaultProfile;
          }
          return {
            perfil,
            totalScore: spec?.totalScore,
            weeklyScore: spec?.weeklyScore,
            totalAU: spec?.totalAU,
            tipo: 1,
          };
        })
      );

      const npcs = todosNPCs?.data?.leaderboardNPCs?.map(async (npc: any) => {
        return {
          perfil: info?.find((spr) => spr?.perfil?.ownedBy?.address == npc?.npc)
            ?.perfil,
          totalScore: npc?.totalScore,
          weeklyScore: npc?.weeklyScore,
          totalAU: npc?.totalAU,
          tipo: 0,
        };
      });

      setTabla(
        [...specs, ...npcs]?.sort((a, b) => b.totalScore - a.totalScore)
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setNPCsCargando(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setPantalla(window.innerWidth > 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!atributos) {
      llamarAtributos();
    }
  }, []);

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(
        // `ws://127.0.0.1:8080?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`

        `wss://npc-rust-engine.onrender.com?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`
      );

      setSocket(newSocket);

      newSocket.onopen = () => {
        newSocket.send(
          JSON.stringify({
            tipo: "datosDeEscenas",
            clave: "estudio abierto de trabajo",
          })
        );
      };

      newSocket.onerror = (error) => {
        console.error(error);
      };

      newSocket.onmessage = (evento) => {
        const datos = JSON.parse(evento.data);
        const nombre = datos.nombre;
        const valores = datos.datos;
        if (nombre === "datosDeEscenas") {
          setEscenas(valores);
        }
      };

      const closeWebSocket = () => {
        newSocket.close();
      };

      window.addEventListener("beforeunload", closeWebSocket);

      return () => {
        window.removeEventListener("beforeunload", closeWebSocket);

        if (newSocket.readyState === WebSocket.OPEN) {
          newSocket.close();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (escenas?.length > 0) {
      llamaNPC();
    }
  }, [escenas?.length]);

  useEffect(() => {
    if (lensConectado?.id && !espectadorInfo) {
      cogerInfoEspectador();
    }
  }, [lensConectado?.id]);

  return {
    pantallaCambio,
    setPantallaCambio,
    atributos,
    pantalla,
    npcsCargando,
    todosLosNPCs,
    mostrarMas,
    setMostrarMas,
    informacion,
    espectadorInfo,
    espectadorInfoLoading,
    cogerCargando,
    manejarCoger,
    tokensGuardados,
    setDesafiantes,
    desafiantes,
    todosLosDesafiantes,
    tabla,
  };
};

export default useAgentes;
