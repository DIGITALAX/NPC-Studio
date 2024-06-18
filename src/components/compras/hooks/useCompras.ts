import {
  AutographType,
  Coleccion,
  DatosOraculos,
} from "@/components/game/types/game.types";
import { Catalogo, Compra, Details, Mezcla } from "../types/compras.types";
import { SetStateAction, useEffect, useState } from "react";
import {
  LitNodeClient,
  checkAndSignAuthMessage,
} from "@lit-protocol/lit-node-client";
import { cifrarElementos } from "@/lib/helpers/cifrarElementos";
import { Profile } from "../../../../graphql/generated";
import { polygonAmoy } from "viem/chains";
import { PublicClient, createWalletClient, custom } from "viem";
import AutographMarket from "./../../../../abis/AutographMarket.json";
import {
  AUTOGRAPH_MARKET,
  AUTOGRAPH_OPEN_ACTION,
  autographTypeToNumber,
} from "@/lib/constants";
import { Indexar, Notificacion } from "@/components/common/types/common.types";
import lensAct from "@/lib/helpers/lensAct";
import toHexWithLeadingZero from "@/lib/helpers/leadingZero";
import { ethers } from "ethers";

const useCompras = (
  carrito: { compras: Compra[]; abierto: boolean },
  setCarrito: (
    e: SetStateAction<{ compras: Compra[]; abierto: boolean }>
  ) => void,
  client: LitNodeClient,
  address: `0x${string}` | undefined,
  lensConectado: Profile | undefined,
  publicClient: PublicClient,
  articuloSeleccionado: Compra[],
  datosOraculos: DatosOraculos[],
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void
) => {
  const coder = new ethers.AbiCoder();
  const [aprobarCargando, setAprobarCargando] = useState<boolean>(false);
  const [gastosAprobados, setGastosAprobados] = useState<
    { token: string; aprobado: boolean }[]
  >([]);
  const [carritoCargando, setCarritoCargando] = useState<boolean>(false);
  const [cumplimiento, setCumplimiento] = useState<Details>({
    nombre: "",
    lens: "",
    direccion: "",
    zip: "",
    ciudad: "",
    estado: "",
    pais: "",
    colores: [],
    tamanos: [],
  });

  const cifrarCumplimiento = async (
    elementos: Compra[]
  ): Promise<
    | {
        coleccionId: number;
        cifrados: string;
      }[]
    | undefined
  > => {
    if (
      !address ||
      cumplimiento?.direccion?.trim() === "" ||
      cumplimiento?.ciudad?.trim() === "" ||
      cumplimiento?.nombre?.trim() === "" ||
      cumplimiento?.estado?.trim() === "" ||
      cumplimiento?.zip?.trim() === "" ||
      cumplimiento?.pais?.trim() === ""
    ) {
      setCarritoCargando(false);
      return;
    }
    try {
      let nonce = await client.getLatestBlockhash();
      await checkAndSignAuthMessage({
        chain: "mumbai",
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
        })),
        {
          ...cumplimiento,
          lens: lensConectado?.handle?.suggestedFormatted?.localName!,
        },
        address
      );

      return cadenasCifradas;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const comprarPublicacion = async (elemento: Compra) => {
    setCarritoCargando(true);
    try {
      let cadenasCifradas:
        | {
            coleccionId: number;
            cifrados: string;
          }[]
        | undefined;
      if (elemento.tipo !== AutographType.NFT) {
        cadenasCifradas = await cifrarCumplimiento([elemento]);
      }

      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      const datos = coder.encode(
        ["string", "address", "uint8", "uint8"],
        [
          cadenasCifradas ? cadenasCifradas?.[0].cifrados : "",
          elemento?.token,
          Number(elemento?.cantidad),
          autographTypeToNumber[elemento?.tipo],
        ]
      );

      await lensAct(
        `${toHexWithLeadingZero(
          Number(
            (elemento.elemento as Coleccion)?.profileIds?.[0]
              ? (elemento.elemento as Coleccion)?.profileIds?.[0]
              : (elemento.elemento as Catalogo)?.profileId
          )
        )}-${toHexWithLeadingZero(
          (elemento.elemento as Coleccion)?.pubIds?.[0]
            ? Number((elemento.elemento as Coleccion)?.pubIds?.[0])
            : Number((elemento.elemento as Catalogo)?.pubId)
        )}`,
        {
          unknownOpenAction: {
            address: AUTOGRAPH_OPEN_ACTION,
            data: datos,
          },
        },
        address!,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion
      );
      setMostrarNotificacion(Notificacion.Comprado);
    } catch (err: any) {
      console.error(err.message);
    }
    setCarritoCargando(false);
  };

  const comprarCarrito = async () => {
    setCarritoCargando(true);
    try {
      let cadenasCifradas:
        | {
            coleccionId: number;
            cifrados: string;
          }[]
        | undefined;
      if (
        carrito?.compras?.filter((c) => c.tipo !== AutographType.NFT)?.length >
        0
      ) {
        cadenasCifradas = await cifrarCumplimiento(
          carrito?.compras?.filter((c) => c.tipo !== AutographType.NFT)
        );
      }

      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_MARKET,
        abi: AutographMarket,
        functionName: "buyTokens",
        chain: polygonAmoy,
        args: [
          carrito.compras?.map((com) => com.token),
          carrito.compras?.map(
            (com) => Number((com.elemento as Coleccion)?.coleccionId) || 0
          ),
          carrito.compras?.map((com) =>
            Number((com.elemento as Mezcla)?.maximo)
              ? Number((com.elemento as Mezcla)?.maximo) * 10 ** 18
              : 0
          ),
          carrito.compras?.map((com) => Number(com.cantidad)),
          carrito.compras?.map((com) => autographTypeToNumber[com.tipo]),
          carrito.compras?.map((com) =>
            cadenasCifradas?.find(
              (cad) =>
                Number(cad.coleccionId) ==
                Number((com.elemento as Coleccion).coleccionId || 0)
            )
              ? cadenasCifradas?.find(
                  (cad) =>
                    Number(cad.coleccionId) ==
                    Number((com.elemento as Coleccion).coleccionId || 0)
                )?.cifrados
              : ""
          ),
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });

      setCarrito({
        abierto: false,
        compras: [],
      });
      setMostrarNotificacion(Notificacion.Comprado);
    } catch (err: any) {
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
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: token as `0x${string}`,
        abi: [
          token === "0x6968105460f67c3bf751be7c15f92f5286fd0ce5"
            ? {
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
                outputs: [
                  { internalType: "bool", name: "success", type: "bool" },
                ],
                stateMutability: "nonpayable",
                type: "function",
              }
            : token === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
            ? {
                constant: false,
                inputs: [
                  { name: "guy", type: "address" },
                  { name: "wad", type: "uint256" },
                ],
                name: "approve",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              }
            : {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "approve",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
        ],
        functionName: "approve",
        chain: polygonAmoy,
        args: [
          AUTOGRAPH_MARKET,
          (precio /
            Number(
              datosOraculos?.find((oraculo) => oraculo.currency === token)?.rate
            )) *
            Number(
              datosOraculos?.find((oraculo) => oraculo.currency === token)?.wei
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
      console.error(err.message);
    }
    setAprobarCargando(false);
  };

  const comprobarAprobado = async () => {
    try {
      if (
        !carrito?.abierto &&
        articuloSeleccionado?.[0]?.tipo === AutographType.Mix
      )
        return;

      let aprobados: { token: string; aprobado: boolean }[] = [];
      await Promise.all(
        (carrito?.abierto
          ? carrito?.compras?.reduce(
              (acc: { token: string; precio: number }[], el) => {
                const existingToken = acc.find(
                  (item) => item.token === el.token
                );
                if (existingToken) {
                  existingToken.precio +=
                    Number(
                      Number((el.elemento as Coleccion)?.precio) > 0
                        ? (el.elemento as Coleccion)?.precio
                        : (el?.elemento as Mezcla)?.maximo * 10 ** 18
                    ) * el.cantidad;
                } else {
                  acc.push({
                    token: el.token,
                    precio:
                      Number(
                        Number((el.elemento as Coleccion)?.precio) > 0
                          ? (el.elemento as Coleccion)?.precio
                          : (el?.elemento as Mezcla)?.maximo * 10 ** 18
                      ) * el.cantidad,
                  });
                }
                return acc;
              },
              []
            )
          : articuloSeleccionado?.map((el) => ({
              token: el.token,
              precio:
                Number(
                  Number((el.elemento as Coleccion)?.precio) > 0
                    ? (el.elemento as Coleccion)?.precio
                    : (el?.elemento as Mezcla)?.maximo * 10 ** 18
                ) * el.cantidad,
            }))
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

          if (address) {
            if (
              Number((data as any)?.toString()) /
                Number(
                  datosOraculos?.find(
                    (oraculo) => oraculo.currency === elemento.token
                  )?.wei
                ) >=
              elemento.precio /
                Number(
                  datosOraculos?.find(
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
          } else {
            aprobados.push({
              aprobado: false,
              token: elemento?.token,
            });
          }
        })
      );
      console.log({aprobados})
      setGastosAprobados(aprobados);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    comprobarAprobado();
  }, [articuloSeleccionado, carrito?.abierto]);

  return {
    carritoCargando,
    comprarPublicacion,
    comprarCarrito,
    cumplimiento,
    setCumplimiento,
    aprobarGastos,
    aprobarCargando,
    gastosAprobados,
  };
};

export default useCompras;
