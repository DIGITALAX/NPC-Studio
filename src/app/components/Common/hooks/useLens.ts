import { evmAddress } from "@lens-protocol/client";
import {
  fetchAccountsAvailable,
  revokeAuthentication,
} from "@lens-protocol/client/actions";
import { AUTOGRAPH_ACCESS_CONTROLS } from "@/app/lib/constants";
import { useContext, useEffect, useState } from "react";
import { createWalletClient, custom, PublicClient } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import { ModalContext } from "@/app/providers";

const useLens = (
  isConnected: boolean,
  address: `0x${string}` | undefined,
  dict: any,
  publicClient: PublicClient
) => {
  const contexto = useContext(ModalContext);
  const [lensCargando, setLensCargando] = useState<boolean>(false);

  const resumeLensSession = async () => {
    try {
      const resumed = await contexto?.clienteLens?.resumeSession();

      if (resumed?.isOk()) {
        const accounts = await fetchAccountsAvailable(contexto?.clienteLens!, {
          managedBy: evmAddress(contexto?.lensConectado?.address!),
          includeOwned: true,
        });

        if (accounts.isErr()) {
          return;
        }

        contexto?.setLensConectado?.({
          ...contexto?.lensConectado,

          profile: accounts.value.items?.[0]?.account,
          sessionClient: resumed?.value,
        });
      }
    } catch (err) {
      console.error("Error al reanudar la sesión:", err);
      return null;
    }
  };

  useEffect(() => {
    if (isConnected && !contexto?.lensConectado?.address && address) {
      contexto?.setLensConectado({
        ...contexto?.lensConectado,
        address: address,
      });
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (
      contexto?.lensConectado?.address &&
      contexto?.clienteLens &&
      !contexto?.lensConectado?.profile
    ) {
      resumeLensSession();
    }
  }, [contexto?.lensConectado?.address, contexto?.clienteLens]);

  useEffect(() => {
    if (contexto?.pantalla == 1) {
      comprobrarArtista();
    }
  }, [contexto?.pantalla]);

  const comprobrarArtista = async () => {
    try {
      const data = await publicClient.readContract({
        address: AUTOGRAPH_ACCESS_CONTROLS,
        abi: [
          {
            type: "function",
            name: "isDesigner",
            inputs: [
              { name: "_address", type: "address", internalType: "address" },
            ],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
          },
        ],
        functionName: "isDesigner",
        args: [address!],
      });
      contexto?.setEsArtista(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleConectarse = async () => {
    if (!contexto?.lensConectado?.address || !contexto?.clienteLens) return;
    setLensCargando(true);
    try {
      const signer = createWalletClient({
        chain: chains.mainnet,
        transport: custom(window.ethereum!),
        account: contexto?.lensConectado?.address,
      });
      const accounts = await fetchAccountsAvailable(contexto?.clienteLens, {
        managedBy: evmAddress(signer.account.address),
        includeOwned: true,
      });

      if (accounts.isErr()) {
        setLensCargando(false);
        return;
      }
      if (accounts.value.items?.[0]?.account?.address) {
        const authenticated = await contexto?.clienteLens?.login({
          accountOwner: {
            account: evmAddress(accounts.value.items?.[0]?.account?.address),
            owner: signer.account?.address?.toLowerCase(),
          },
          signMessage: (message) => signer.signMessage({ message }),
        });

        if (authenticated.isErr()) {
          console.error(authenticated.error);
          contexto?.setError?.(dict.Home.auth);
          setLensCargando(false);
          return;
        }

        const sessionClient = authenticated.value;

        contexto?.setLensConectado?.({
          address: contexto?.lensConectado?.address,

          sessionClient,
          profile: accounts.value.items?.[0]?.account,
        });
      } else {
        const authenticatedOnboarding = await contexto?.clienteLens.login({
          onboardingUser: {
            wallet: signer.account.address,
          },
          signMessage: (message) => signer.signMessage({ message }),
        });

        if (authenticatedOnboarding.isErr()) {
          console.error(authenticatedOnboarding.error);
          contexto?.setError?.(dict.Home.error1);

          setLensCargando(false);
          return;
        }

        const sessionClient = authenticatedOnboarding.value;

        contexto?.setLensConectado?.({
          address: contexto?.lensConectado?.address,
          sessionClient,
        });

        contexto?.setCrearCuenta?.(true);
        contexto?.setConnect?.(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }

    setLensCargando(false);
  };

  const salir = async () => {
    setLensCargando(true);
    try {
      const auth =
        contexto?.lensConectado?.sessionClient?.getAuthenticatedUser();

      if (auth?.isOk()) {
        await revokeAuthentication(contexto?.lensConectado?.sessionClient!, {
          authenticationId: auth.value?.authenticationId,
        });

        contexto?.setLensConectado?.(undefined);
        window.localStorage.removeItem("lens.mainnet.credentials");
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setLensCargando(false);
  };

  useEffect(() => {
    if (
      !isConnected &&
      contexto?.lensConectado?.profile &&
      contexto?.clienteLens
    ) {
      salir();
    }
  }, [isConnected]);

  return {
    lensCargando,
    salir,
    handleConectarse,
  };
};

export default useLens;
