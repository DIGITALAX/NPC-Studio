import { useState } from "react";

const useMap = () => {
  const [mostrarMas, setMostrarMas] = useState<boolean>(false);

  return {
    mostrarMas,
    setMostrarMas,
  };
};

export default useMap;
