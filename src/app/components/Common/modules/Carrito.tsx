import Image from "next/legacy/image";
import {
  FunctionComponent,
  JSX,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AutographType } from "../types/common.types";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import { ModalContext } from "@/app/providers";

const Carrito: FunctionComponent<{
  dict: any;
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          disenadores: string[];
          tipo: AutographType;
        }
      | undefined
    >
  ) => void;
}> = ({ dict, setManejarMostrarArticulo }): JSX.Element => {
  const contexto = useContext(ModalContext);
  const [carritoAnim, setCarritoAnim] = useState<boolean>(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (
      Number(
        contexto?.carrito?.compras?.reduce((acc, val) => acc + val.cantidad, 0)
      ) > 0
    ) {
      timeoutId = setTimeout(() => {
        setCarritoAnim(false);
      }, 1000);
    }

    return () => timeoutId && clearTimeout(timeoutId);
  }, [contexto?.carrito?.compras?.reduce((acc, val) => acc + val.cantidad, 0)]);

  return (
    <div className="fixed bottom-5 right-5 w-fit h-fit z-500">
      <div
        className="relative bg-black rounded-full p-2 h-14 w-14 cursor-pointer active:scale-95 border border-ligero flex items-center justify-center hover:opacity-70"
        onClick={() => {
          contexto?.setCarrito({
            compras: contexto?.carrito?.compras || [],
            abierto: !contexto?.carrito?.abierto,
          });
          setManejarMostrarArticulo(undefined);
        }}
        id={carritoAnim ? "cartAnim" : ""}
        title={dict.Home.cart}
      >
        <Image
          src={`${INFURA_GATEWAY_INTERNAL}QmeUvktErG1LkwLYRZjU7FqWj9nCXkHcMoy7kpfwTe3WSM`}
          layout="fill"
          objectFit="cover"
          draggable={false}
        />
      </div>
      {Number(
        contexto?.carrito?.compras?.reduce((acc, val) => acc + val.cantidad, 0)
      ) > 0 && (
        <div className="absolute rounded-full border border-ligero bg-black w-5 flex items-center justify-center right-0 -bottom-1 h-5 p-1 font-con text-mar text-xxs z-1">
          {contexto?.carrito?.compras?.reduce(
            (acc, val) => acc + val.cantidad,
            0
          )}
        </div>
      )}
    </div>
  );
};

export default Carrito;
