import { INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { PedidosProps } from "../types/game.types";

function Pedidos({
  todosLosPedidos,
  pedidosCargando,
  manejarDescifrar,
  descifrarCargando
}: PedidosProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={`${INFURA_GATEWAY}/ipfs/QmanpFJZmunhedHndu398hbgkB1z48EH1iX3gK5nVZnoaC`}
        draggable={false}
        layout="fill"
        priority
      />
    </div>
  );
}

export default Pedidos;
