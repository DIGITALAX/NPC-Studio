const Studio = dynamic(() => import("../../Common/modules/Studio"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { useContext } from "react";
import { ModalContext } from "@/app/providers";
import { PantallaCambioProps } from "../types/common.types";
import Mint from "../../Mint/modules/Mint";
import Pedidos from "../../Orders/modules/Pedidos";

function PantallaCambio({
  dict,
  cargando,
  setCargando,
  setManejarMostrarArticulo,
  setNpc,
  npc,
  manejarMostrarArticulo,
}: PantallaCambioProps) {
  const contexto = useContext(ModalContext);
  switch (contexto?.pantalla) {
    case 1:
      return <Mint dict={dict} />;

    case 2:
      return <Pedidos dict={dict} />;

    default:
      return (
        <Studio
          manejarMostrarArticulo={manejarMostrarArticulo}
          setManejarMostrarArticulo={setManejarMostrarArticulo}
          setNpc={setNpc}
          dict={dict}
          setCargando={setCargando}
          cargando={cargando}
          npc={npc}
        />
      );
  }
}

export default PantallaCambio;
