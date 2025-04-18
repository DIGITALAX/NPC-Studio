import { ModalContext } from "@/app/providers";
import { chains } from "@lens-chain/sdk/viem";
import {
  AnyAccountBalance,
  bigDecimal,
  blockchainData,
  Erc20Amount,
  evmAddress,
} from "@lens-protocol/client";
import {
  deposit,
  executePostAction,
  fetchAccountBalances,
} from "@lens-protocol/client/actions";
import { ethers } from "ethers";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { useAccount } from "wagmi";
import { Details } from "../../Orders/types/orders.types";
import { AUTOGRAPH_ACTION, AUTOGRAPH_MARKET } from "@/app/lib/constants";
import {
  AutographType,
  Catalogo,
  Coleccion,
  Compra,
  Indexar,
} from "../types/common.types";
import pollResult from "@/app/lib/helpers/pollResult";
import { Notificacion } from "../../Modals/types/modals.types";
import { cifrarElementos } from "@/app/lib/helpers/cifrarElementos";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_NETWORK } from "@lit-protocol/constants";

const usePublicacion = (
  dict: any,
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          tipo: AutographType;
          disenadores: string[];
        }
      | undefined
    >
  ) => void,
  articuloSeleccionado: Compra[],
  articuloIndice: number
) => {
  const coder = new ethers.AbiCoder();
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const client = new LitNodeClient({
    litNetwork: LIT_NETWORK.Datil,
    debug: false,
  });
  const { address } = useAccount();
  const contexto = useContext(ModalContext);
  const [publicacionCargando, setPublicacionCargando] =
    useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [deposited, setDeposited] = useState<boolean>(false);
  const [cumplimiento, setCumplimiento] = useState<Details>({
    nombre: "",
    account: contexto?.lensConectado?.profile?.address,
    direccion: "",
    zip: "",
    ciudad: "",
    estado: "",
    pais: "",
  });

  const depositFunds = async () => {
    setDepositLoading(true);
    try {
      const res = await deposit(contexto?.lensConectado?.sessionClient!, {
        erc20: {
          value: bigDecimal(
            (Number(articuloSeleccionado[articuloIndice]?.elemento?.precio) /
              10 ** 18 /
              Number(
                contexto?.oraculos?.find(
                  (oraculo) =>
                    oraculo.currency?.toLowerCase() ===
                    articuloSeleccionado[articuloIndice]?.token?.toLowerCase()
                )?.rate
              )) *
              Number(
                contexto?.oraculos?.find(
                  (oraculo) =>
                    oraculo.currency?.toLowerCase() ===
                    articuloSeleccionado[articuloIndice]?.token?.toLowerCase()
                )?.wei
              )
          ),
          currency: evmAddress(articuloSeleccionado[articuloIndice]?.token),
        },
      });

      if (res?.isOk()) {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        const tx = {
          chainId: (res.value as any)?.raw?.chainId,
          from: (res.value as any)?.raw?.from,
          to: (res.value as any)?.raw?.to,
          nonce: (res.value as any)?.raw?.nonce,
          gasLimit: (res.value as any)?.raw?.gasLimit,
          maxFeePerGas: (res.value as any)?.raw?.maxFeePerGas,
          maxPriorityFeePerGas: (res.value as any)?.raw?.maxPriorityFeePerGas,
          value: (res.value as any)?.raw?.value,
          data: (res.value as any)?.raw?.data,
        };
        const txResponse = await signer.sendTransaction(tx);
        await txResponse.wait();
        setDeposited(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDepositLoading(false);
  };

  const comprarPublicacion = async () => {
    if (!address || !contexto?.lensConectado?.sessionClient) return;
    setPublicacionCargando(true);
    try {
      let cadenasCifradas: string = "";

      if (articuloSeleccionado[articuloIndice]?.tipo !== AutographType.NFT) {
        if (
          cumplimiento?.direccion?.trim() === "" ||
          cumplimiento?.ciudad?.trim() === "" ||
          cumplimiento?.nombre?.trim() === "" ||
          cumplimiento?.estado?.trim() === "" ||
          cumplimiento?.zip?.trim() === "" ||
          cumplimiento?.pais?.trim() === ""
        ) {
          contexto?.setMostrarNotificacion(Notificacion.Cumplimiento);
          setPublicacionCargando(false);
          return;
        }
        const cadena = await cifrarElementos(
          client,
          [articuloSeleccionado[articuloIndice]].map((el) => ({
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

        if (!cadena) {
          setPublicacionCargando(false);
          return;
        } else {
          cadenasCifradas = cadena;
        }
      }
      const erc20 = new ethers.Contract(
        articuloSeleccionado[articuloIndice]?.token,
        [
          "function approve(address spender, uint256 amount) public returns (bool)",
        ],
        new ethers.JsonRpcProvider("https://rpc.lens.xyz", 232)
      );

      const approveData = erc20.interface.encodeFunctionData("approve", [
        AUTOGRAPH_MARKET,
        bigDecimal(
          ((Number(articuloSeleccionado[articuloIndice]?.elemento?.precio) *
            1.1) /
            Number(
              contexto?.oraculos?.find(
                (oraculo) =>
                  oraculo.currency?.toLowerCase() ===
                  articuloSeleccionado[articuloIndice]?.token?.toLowerCase()
              )?.rate
            )) *
            Number(
              contexto?.oraculos?.find(
                (oraculo) =>
                  oraculo.currency?.toLowerCase() ===
                  articuloSeleccionado[articuloIndice]?.token?.toLowerCase()
              )?.wei
            )
        ),
      ]);

      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: contexto?.lensConectado?.profile?.address,
        abi: [
          {
            type: "function",
            name: "executeTransaction",
            inputs: [
              { name: "to", type: "address" },
              { name: "value", type: "uint256" },
              { name: "data", type: "bytes" },
            ],
            outputs: [{ name: "", type: "bytes" }],
            stateMutability: "payable",
          },
        ],
        functionName: "executeTransaction",
        chain: chains.mainnet,
        args: [
          articuloSeleccionado[articuloIndice]?.token as `0x${string}`,
          BigInt(0),
          approveData as `0x${string}`,
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });

      const post = await executePostAction(
        contexto?.lensConectado?.sessionClient,
        {
          post:
            articuloSeleccionado[articuloIndice]?.tipo == AutographType.NFT
              ? (articuloSeleccionado[articuloIndice]?.elemento as Catalogo)
                  ?.postId
              : (articuloSeleccionado[articuloIndice]?.elemento as Coleccion)
                  ?.postIds?.[0],
          action: {
            unknown: {
              address: AUTOGRAPH_ACTION,
              params: [
                {
                  key: ethers.keccak256(
                    ethers.toUtf8Bytes("lens.param.encryptedFulfillment")
                  ),
                  data: blockchainData(
                    coder.encode(["string"], [cadenasCifradas || ""])
                  ),
                },
                {
                  key: ethers.keccak256(
                    ethers.toUtf8Bytes("lens.param.currency")
                  ),
                  data: blockchainData(
                    coder.encode(
                      ["address"],
                      [articuloSeleccionado[articuloIndice]?.token || ""]
                    )
                  ),
                },
                {
                  key: ethers.keccak256(
                    ethers.toUtf8Bytes("lens.param.quantity")
                  ),
                  data: blockchainData(
                    coder.encode(
                      ["uint8"],
                      [Number(articuloSeleccionado[articuloIndice]?.cantidad)]
                    )
                  ),
                },
              ],
            },
          },
        }
      );
      if (post.isErr()) {
        contexto?.setError?.(dict.Home.error);
        setPublicacionCargando(false);
        return;
      }

      if ((post.value as any)?.reason?.includes("Signless")) {
        contexto?.setSignless?.(true);
      } else if ((post.value as any)?.raw) {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        const tx = {
          chainId: (post.value as any)?.raw?.chainId,
          from: (post.value as any)?.raw?.from,
          to: (post.value as any)?.raw?.to,
          nonce: (post.value as any)?.raw?.nonce,
          gasLimit: (post.value as any)?.raw?.gasLimit,
          maxFeePerGas: (post.value as any)?.raw?.maxFeePerGas,
          maxPriorityFeePerGas: (post.value as any)?.raw?.maxPriorityFeePerGas,
          value: (post.value as any)?.raw?.value,
          data: (post.value as any)?.raw?.data,
        };
        const txResponse = await signer.sendTransaction(tx);
        await txResponse.wait();

        contexto?.setSimpleCollect({ open: false });
        contexto?.setIndexar(Indexar.Exito);

        setManejarMostrarArticulo(undefined);
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
      } else if ((post.value as any)?.hash) {
        contexto?.setIndexar(Indexar.Indexando);
        if (
          await pollResult(
            (post.value as any)?.hash,
            contexto?.lensConectado?.sessionClient!
          )
        ) {
          contexto?.setSimpleCollect({ open: false });
          contexto?.setIndexar(Indexar.Exito);

          setManejarMostrarArticulo(undefined);
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
        } else {
          contexto?.setError?.(dict.Home.error1);
        }
      }
    } catch (err: any) {
      contexto?.setError?.(dict.Home.error1);
      console.error(err.message);
    }
    setTimeout(() => {
      contexto?.setIndexar(Indexar.Inactivo);
    }, 3000);
    setPublicacionCargando(false);
  };

  const comprobarSaldo = async () => {
    try {
      if (!contexto?.lensConectado?.sessionClient) return;

      const res = await fetchAccountBalances(
        contexto?.lensConectado?.sessionClient!,
        {
          includeNative: false,
          tokens: [articuloSeleccionado[articuloIndice]?.token],
        }
      );

      if (res?.isOk()) {
        if (
          ((res.value as AnyAccountBalance[])?.[0] as Erc20Amount)?.value >=
          bigDecimal(
            (Number(articuloSeleccionado[articuloIndice]?.elemento?.precio) /
              Number(
                contexto?.oraculos?.find(
                  (oraculo) =>
                    oraculo.currency?.toLowerCase() ===
                    articuloSeleccionado[articuloIndice]?.token?.toLowerCase()
                )?.rate
              )) *
              Number(
                contexto?.oraculos?.find(
                  (oraculo) =>
                    oraculo.currency?.toLowerCase() ===
                    articuloSeleccionado[articuloIndice]?.token?.toLowerCase()
                )?.wei
              )
          )
        ) {
          setDeposited(true);
        } else {
          setDeposited(false);
        }
      }
    } catch (err: any) {
      setDeposited(false);
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (articuloSeleccionado?.length > 0) {
      comprobarSaldo();
    }
  }, [articuloSeleccionado, address, contexto?.lensConectado?.sessionClient]);

  return {
    depositFunds,
    depositLoading,
    deposited,
    comprarPublicacion,
    publicacionCargando,
    cumplimiento,
    setCumplimiento,
  };
};

export default usePublicacion;
