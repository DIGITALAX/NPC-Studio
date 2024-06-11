import { SetStateAction, useState } from "react";

const useMint = (setMint: (e: SetStateAction<number>) => void) => {
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

  return {
    manejarMintear,
    mintCargando,
  };
};

export default useMint;
