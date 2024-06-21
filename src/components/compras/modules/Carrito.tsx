import { AutographType, Dictionary } from "@/components/game/types/game.types";
import { INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { Compra } from "../types/compras.types";

const Carrito: FunctionComponent<{
  dict: Dictionary;
  carrito: {
    compras: Compra[];
    abierto: boolean;
  };
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          disenador: string;
          tipo: AutographType;
        }
      | undefined
    >
  ) => void;
}> = ({ dict, carrito, setCarrito, setManejarMostrarArticulo }): JSX.Element => {
  const [carritoAnim, setCarritoAnim] = useState<boolean>(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (carrito?.compras?.reduce((acc, val) => acc + val.cantidad, 0) > 0) {
      timeoutId = setTimeout(() => {
        setCarritoAnim(false);
      }, 1000);
    }

    return () => timeoutId && clearTimeout(timeoutId);
  }, [carrito?.compras?.reduce((acc, val) => acc + val.cantidad, 0)]);

  return (
    <div className="fixed bottom-5 right-5 w-fit h-fit z-100">
      <div
        className="relative bg-black rounded-full p-2 h-14 w-14 cursor-pointer active:scale-95 border border-ligero flex items-center justify-center hover:opacity-70"
        onClick={() => {
          setCarrito({
            compras: carrito?.compras,
            abierto: true,
          });
          setManejarMostrarArticulo(undefined);
        }}
        id={carritoAnim ? "cartAnim" : ""}
        title={dict.Home.cart}
      >
        <Image
          src={`${INFURA_GATEWAY}/ipfs/QmeUvktErG1LkwLYRZjU7FqWj9nCXkHcMoy7kpfwTe3WSM`}
          layout="fill"
          objectFit="cover"
          draggable={false}
        />
      </div>
      {carrito?.compras?.reduce((acc, val) => acc + val.cantidad, 0) > 0 && (
        <div className="absolute rounded-full border border-ligero bg-black w-5 flex items-center justify-center right-0 -bottom-1 h-5 p-1 font-con text-mar text-xxs z-1 text-ligero">
          {carrito?.compras?.reduce((acc, val) => acc + val.cantidad, 0)}
        </div>
      )}
    </div>
  );
};

export default Carrito;
