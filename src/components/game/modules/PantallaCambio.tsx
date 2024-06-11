import { PantallaCambioProps } from "../types/game.types";
const Studio = dynamic(() => import("../../game/modules/Studio"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import Pedidos from "./Pedidos";
import Process from "./Process";

function PantallaCambio({
  npc,
  escena,
  setNpc,
  setCargando,
  cargando,
  pantalla,
  mint,
  dict,
  setMint,
  manejarMintear,
  mintCargando,
  setMostrarNotificacion,
  esArtista,
  isConnected,
  openConnectModal,
}: PantallaCambioProps) {
  switch (pantalla) {
    case 1:
      return (
        <Process
          setMint={setMint!}
          mint={Number(mint)}
          manejarMintear={manejarMintear}
          mintCargando={mintCargando}
          dict={dict}
          setMostrarNotificacion={setMostrarNotificacion}
          esArtista={esArtista}
          isConnected={isConnected}
          openConnectModal={openConnectModal}
        />
      );

    case 2:
      return <Pedidos />;

    default:
      return (
        <Studio
          npc={npc}
          escena={escena}
          setNpc={setNpc}
          setCargando={setCargando}
          cargando={cargando}
        />
      );
  }
}

export default PantallaCambio;
