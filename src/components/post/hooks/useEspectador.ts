import { useState } from "react";

const useEspectador = () => {
  const [votarCargando, setVotarCargando] = useState<boolean>(false);
  const [votarTipo, setVotarTipo] = useState<number>(0);

  const handleVotar = async () => {
    setVotarCargando(true);
    try {
      // como una cita :)
    } catch (err: any) {
      console.error(err.message);
    }
    setVotarCargando(false);
  };

  return {
    votarCargando,
    handleVotar,
    votarTipo,
    setVotarTipo,
  };
};

export default useEspectador;
