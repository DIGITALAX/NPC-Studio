import { Dictionary } from "@/components/game/types/game.types";
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
}> = ({ dict, carrito, setCarrito }): JSX.Element => {
  const [carritoAnim, setCarritoAnim] = useState<boolean>(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (carrito?.compras?.length > 0) {
      timeoutId = setTimeout(() => {
        setCarritoAnim(false);
      }, 1000);
    }

    return () => timeoutId && clearTimeout(timeoutId);
  }, [carrito?.compras?.length]);

  return (
    <div className="fixed bottom-5 right-5 w-fit h-fit z-30">
      <div
        className="relative bg-black rounded-full p-2 h-14 w-14 border border-white flex items-center justify-center hover:opacity-70"
        onClick={() =>
          setCarrito({
            compras: carrito?.compras,
            abierto: true,
          })
        }
      >
        <div
          className="relative w-8 h-8 flex items-center justify-center cursor-pointer active:scale-95"
          id={carritoAnim ? "cartAnim" : ""}
          title={dict.Home.cart}
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmT5ewiqFhfo8EHxSYiFwFR67pBpg7xesdtwAu9oWBoqqu`}
            layout="fill"
            draggable={false}
          />
        </div>
      </div>
      {carrito?.compras?.length > 0 && (
        <div className="absolute rounded-full border border-mar bg-black w-5 flex items-center justify-center right-0 -bottom-1 h-5 p-1 font-vcr text-mar text-xxs z-1">
          {carrito?.compras?.length}
        </div>
      )}
    </div>
  );
};

export default Carrito;
