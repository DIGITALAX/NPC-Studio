import { SetStateAction, useContext, useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { ModalContext } from "@/app/providers";
import { Details } from "../../Orders/types/orders.types";
import { AutographType, Coleccion, Compra } from "../types/common.types";
import { useAccount } from "wagmi";
import { Notificacion } from "../../Modals/types/modals.types";
import { AUTOGRAPH_MARKET } from "@/app/lib/constants";
import {
  checkAndSignAuthMessage,
  LitNodeClient,
} from "@lit-protocol/lit-node-client";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { chains } from "@lens-chain/sdk/viem";
import AutographMarket from "./../../../../../abis/AutographMarket.json";
import { cifrarElementos } from "@/app/lib/helpers/cifrarElementos";

const useCompras = (
  dict: any,
  setAprobarCargando: (e: SetStateAction<boolean>) => void,
  setCarritoCargando: (e: SetStateAction<boolean>) => void
) => {
  const client = new LitNodeClient({
    litNetwork: LIT_NETWORK.Datil,
    debug: false,
  });
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const { address } = useAccount();
  const contexto = useContext(ModalContext);
  const [gastosAprobados, setGastosAprobados] = useState<
    { token: string; aprobado: boolean }[]
  >([]);
  const [cumplimiento, setCumplimiento] = useState<Details>({
    nombre: "",
    account: contexto?.lensConectado?.profile?.address,
    direccion: "",
    zip: "",
    ciudad: "",
    estado: "",
    pais: "",
  });

  const cifrarCumplimiento = async (
    elementos: Compra[]
  ): Promise<string | undefined> => {
    if (
      !address ||
      cumplimiento?.direccion?.trim() === "" ||
      cumplimiento?.ciudad?.trim() === "" ||
      cumplimiento?.nombre?.trim() === "" ||
      cumplimiento?.estado?.trim() === "" ||
      cumplimiento?.zip?.trim() === "" ||
      cumplimiento?.pais?.trim() === ""
    ) {
      contexto?.setMostrarNotificacion(Notificacion.Cumplimiento);
      setCarritoCargando(false);
      return;
    }
    try {
      let nonce = await client.getLatestBlockhash();
      await checkAndSignAuthMessage({
        chain: "polygon",
        nonce: nonce!,
      });
      await client.connect();
      const cadenasCifradas = await cifrarElementos(
        client,
        elementos.map((el) => ({
          color: el.color,
          cantidad: el.cantidad,
          tamano: el.tamano,
          id: (el.elemento as Coleccion)?.coleccionId || 0,
          tipo: el.tipo,
          moneda: el.token,
        })),
        {
          ...cumplimiento,
          account: contexto?.lensConectado?.profile?.address,
        },
        address
      );

      return cadenasCifradas;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const comprarCarrito = async () => {
    setCarritoCargando(true);
    try {
      let cadenasCifradas: string | undefined = "";
      if (
        Number(
          contexto?.carrito?.compras?.filter(
            (c) => c.tipo !== AutographType.NFT
          )?.length
        ) > 0
      ) {
        cadenasCifradas = await cifrarCumplimiento(
          (contexto?.carrito?.compras || [])?.filter(
            (c) => c.tipo !== AutographType.NFT
          )
        );

        if (!cadenasCifradas) {
          setCarritoCargando(false);
          return;
        }
      }

      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_MARKET,
        abi: AutographMarket,
        functionName: "buyTokens",
        chain: chains.mainnet,
        args: [
          contexto?.carrito.compras?.map((com) => com.token),
          contexto?.carrito.compras?.map(
            (com) => Number((com.elemento as Coleccion)?.coleccionId) || 0
          ),
          contexto?.carrito.compras?.map((com) => Number(com.cantidad)),
          cadenasCifradas,
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });

      contexto?.setCarrito({
        abierto: false,
        compras: [],
      });
      setCumplimiento({
        nombre: "",
        account: contexto?.lensConectado?.profile?.address,
        direccion: "",
        zip: "",
        ciudad: "",
        estado: "",
        pais: "",
      });
      contexto?.setMostrarNotificacion(Notificacion.Comprado);
    } catch (err: any) {
      contexto?.setError?.(dict.Home.error1);
      console.error(err.message);
    }
    setCarritoCargando(false);
  };

  const aprobarGastos = async (
    token: string,
    precio: number,
    indice: number
  ) => {
    setAprobarCargando(true);

    try {
      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: token as `0x${string}`,
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokens",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [{ internalType: "bool", name: "success", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "approve",
        chain: chains.mainnet,
        args: [
          AUTOGRAPH_MARKET,
          BigInt(
            (Number(precio * 10 ** 18) /
              Number(
                contexto?.oraculos?.find(
                  (oraculo) =>
                    oraculo.currency?.toLowerCase() === token?.toLowerCase()
                )?.rate
              )) *
              Number(
                contexto?.oraculos?.find(
                  (oraculo) =>
                    oraculo.currency?.toLowerCase() === token?.toLowerCase()
                )?.wei
              )
          ),
        ],
        account: address,
      });
      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });

      setGastosAprobados(
        gastosAprobados.map((val, i) =>
          indice == i
            ? {
                aprobado: true,
                token: val.token,
              }
            : val
        )
      );
    } catch (err: any) {
      contexto?.setError?.(dict.Home.error1);
      console.error(err.message);
    }
    setAprobarCargando(false);
  };

  const comprobarAprobado = async () => {
    try {
      if (!address) return;

      let aprobados: { token: string; aprobado: boolean }[] = [];
      await Promise.all(
        (
          contexto?.carrito?.compras?.reduce(
            (acc: { token: string; precio: number }[], el) => {
              const existingToken = acc.find((item) => item.token === el.token);
              if (existingToken) {
                existingToken.precio +=
                  Number((el.elemento as Coleccion)?.precio) * el.cantidad;
              } else {
                acc.push({
                  token: el.token,
                  precio:
                    Number((el.elemento as Coleccion)?.precio) * el.cantidad,
                });
              }
              return acc;
            },
            []
          ) || []
        )?.map(async (elemento) => {
          const data = await publicClient.readContract({
            address: elemento.token?.toLowerCase() as `0x${string}`,
            abi: [
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                ],
                name: "allowance",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "allowance",
            args: [address as `0x${string}`, AUTOGRAPH_MARKET],
            account: address,
          });

          if (
            Number((data as any)?.toString()) /
              Number(
                contexto?.oraculos?.find(
                  (oraculo) => oraculo.currency === elemento.token
                )?.wei
              ) >=
            elemento.precio /
              Number(
                contexto?.oraculos?.find(
                  (oraculo) => oraculo.currency === elemento.token
                )?.rate
              )
          ) {
            aprobados.push({
              aprobado: true,
              token: elemento?.token,
            });
          } else {
            aprobados.push({
              aprobado: false,
              token: elemento?.token,
            });
          }
        })
      );
      setGastosAprobados(aprobados);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (contexto?.carrito?.abierto) {
      comprobarAprobado();
    }
  }, [
    contexto?.carrito?.abierto,
    address,
    contexto?.lensConectado?.sessionClient,
  ]);

  return {
    comprarCarrito,
    cumplimiento,
    setCumplimiento,
    aprobarGastos,
    gastosAprobados,
  };
};

export default useCompras;
