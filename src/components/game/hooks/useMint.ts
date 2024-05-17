import { SetStateAction, useState } from "react";

const useMint = (setArtists: (e: SetStateAction<number>) => void) => {
  const [mintCargando, setMintCargando] = useState<boolean>(false);

  const manejarMintear = async () => {
    setMintCargando(true);
    try {
      setArtists(4);
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
