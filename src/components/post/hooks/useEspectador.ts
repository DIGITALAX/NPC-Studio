import { useState } from "react";
import { Historia, PubVote } from "../types/post.types";

const useEspectador = () => {
  const [votarCargando, setVotarCargando] = useState<boolean>(false);
  const [historia, setHistoria] = useState<Historia[]>([]);
  const [pubVotar, setPubVotar] = useState<PubVote>({
    comment: "",
    model: 50,
    chatContext: 50,
    prompt: 50,
    personality: 50,
    style: 50,
    media: 50,
    tokenizer: 50,
    global: 50,
  });

  const manejarVotar = async () => {
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
    manejarVotar,
    pubVotar,
    setPubVotar,
    historia,
  };
};

export default useEspectador;
