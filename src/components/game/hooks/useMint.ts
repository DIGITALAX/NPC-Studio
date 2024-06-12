import { SetStateAction, useState } from "react";
import { PublicClient } from "viem";

const useMint = (
  setMint: (e: SetStateAction<number>) => void,
  publicClient: PublicClient
) => {
  const [mintCargando, setMintCargando] = useState<boolean>(false);

  const manejarMintear = async () => {
    setMintCargando(true);
    try {
      setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const anadirCollecion = async () => {
    setMintCargando(true);
    try {
      setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const borrarCollecion = async () => {
    setMintCargando(true);
    try {
      setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const borrarGalleria = async () => {
    setMintCargando(true);
    try {
      setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  return {
    manejarMintear,
    mintCargando,
  };
};

export default useMint;
