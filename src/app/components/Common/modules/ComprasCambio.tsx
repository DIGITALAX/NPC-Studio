import { FunctionComponent, JSX, useContext } from "react";
import {
  AutographType,
  Coleccion,
  ComprasCambioProps,
  Catalogo as CatalogoTipo,
} from "../types/common.types";
import { ModalContext } from "@/app/providers";
import CarritoAbierto from "./CarritoAbierto";
import Ropas from "./Ropas";
import Catalogo from "./Catalogo";
import Autografo from "./Autografo";

const ComprasCambio: FunctionComponent<ComprasCambioProps> = ({
  manejarMostrarArticulo,
  setManejarMostrarArticulo,
  dict,
  carritoCargando,
  aprobarCargando,
  setAprobarCargando,
  setCarritoCargando,
  articulosActuales,
  articuloSeleccionado,
  setArticuloSeleccionado,
  articuloIndice,
  setArticuloIndice,
}): JSX.Element => {
  const contexto = useContext(ModalContext);

  switch (manejarMostrarArticulo?.tipo) {
    case AutographType.Hoodie:
    case AutographType.Shirt:
    case AutographType.All:
      return (
        <Ropas
          articuloIndice={articuloIndice}
          setArticuloSeleccionado={setArticuloSeleccionado}
          setArticuloIndice={setArticuloIndice}
          setManejarMostrarArticulo={setManejarMostrarArticulo}
          articuloSeleccionado={articuloSeleccionado}
          dict={dict}
          articulos={articulosActuales as Coleccion[]}
        />
      );

    case AutographType.NFT:
      return (
        <Autografo
          articuloIndice={articuloIndice}
          setArticuloSeleccionado={setArticuloSeleccionado}
          setArticuloIndice={setArticuloIndice}
          articuloSeleccionado={articuloSeleccionado}
          dict={dict}
          articulos={articulosActuales as Coleccion[]}
          setManejarMostrarArticulo={setManejarMostrarArticulo}
        />
      );

    case AutographType.Catalog:
      return (
        <Catalogo
          articuloSeleccionado={articuloSeleccionado}
          dict={dict}
          setManejarMostrarArticulo={setManejarMostrarArticulo}
          setArticuloSeleccionado={setArticuloSeleccionado}
          catalogo={articulosActuales?.[0] as CatalogoTipo}
        />
      );

    default: {
      return (
        <>
          {contexto?.carrito?.abierto && (
            <CarritoAbierto
              dict={dict}
              aprobarCargando={aprobarCargando}
              setAprobarCargando={setAprobarCargando}
              setCarritoCargando={setCarritoCargando}
              carritoCargando={carritoCargando}
            />
          )}
        </>
      );
    }
  }
};

export default ComprasCambio;
