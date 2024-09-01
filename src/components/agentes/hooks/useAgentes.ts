import { useState } from "react";
import { Pantalla } from "../types/agentes.types";

const useAgentes = () => {
  const [pantallaCambio, setPantallaCambio] = useState<Pantalla>(
    Pantalla.Puntaje
  );

  return {
    pantallaCambio,
    setPantallaCambio,
  };
};

export default useAgentes;
