import { FunctionComponent } from "react";
import {
  Catalogo as CatalogoTipo,
  ComprasCambioProps,
} from "../types/compras.types";
import { AutographType, Coleccion } from "@/components/game/types/game.types";
import Mezcla from "./Mezcla";
import Autografo from "./Autografo";
import Catalogo from "./Catalogo";
import Ropas from "./Ropas";
import CarritoAbierto from "@/components/common/modules/CarritoAbierto";

const ComprasCambio: FunctionComponent<ComprasCambioProps> = ({
  manejarMostrarArticulo,
  dict,
  articulosActuales,
  setCarrito,
  carritoCargando,
  comprarPublicacion,
  articuloSeleccionado,
  setArticuloSeleccionado,
  aprobarCargando,
  aprobarGastos,
  articuloIndice,
  setArticuloIndice,
  setVerImagen,
  gastosAprobados,
  datosOraculos,
  carrito,
  cumplimiento,
  setCumplimiento,
  comprarCarrito,
  pagina,
  setPagina,
  setMostrarPerfil,
}): JSX.Element => {
  switch (manejarMostrarArticulo?.tipo) {
    case AutographType.Hoodie:
    case AutographType.Shirt:
    case AutographType.All:
      return (
        <Ropas
          setMostrarPerfil={setMostrarPerfil}
          carrito={carrito}
          datosOraculos={datosOraculos}
          gastosAprobados={gastosAprobados}
          setVerImagen={setVerImagen}
          aprobarGastos={aprobarGastos}
          aprobarCargando={aprobarCargando}
          articuloIndice={articuloIndice}
          setArticuloSeleccionado={setArticuloSeleccionado}
          setArticuloIndice={setArticuloIndice}
          articuloSeleccionado={articuloSeleccionado}
          setCarrito={setCarrito}
          comprarPublicacion={comprarPublicacion}
          dict={dict}
          articulos={articulosActuales as Coleccion[]}
          carritoCargando={carritoCargando}
          cumplimiento={cumplimiento}
          setCumplimiento={setCumplimiento}
        />
      );

    case AutographType.NFT:
      return (
        <Autografo
          carrito={carrito}
          setMostrarPerfil={setMostrarPerfil}
          datosOraculos={datosOraculos}
          gastosAprobados={gastosAprobados}
          setVerImagen={setVerImagen}
          aprobarGastos={aprobarGastos}
          aprobarCargando={aprobarCargando}
          articuloIndice={articuloIndice}
          setArticuloSeleccionado={setArticuloSeleccionado}
          setArticuloIndice={setArticuloIndice}
          articuloSeleccionado={articuloSeleccionado}
          setCarrito={setCarrito}
          comprarPublicacion={comprarPublicacion}
          dict={dict}
          articulos={articulosActuales as Coleccion[]}
          carritoCargando={carritoCargando}
        />
      );

    case AutographType.Mix:
      return (
        <Mezcla
          articuloSeleccionado={articuloSeleccionado}
          dict={dict}
          setMostrarPerfil={setMostrarPerfil}
          setCarrito={setCarrito}
          carrito={carrito}
          setVerImagen={setVerImagen}
          setArticuloSeleccionado={setArticuloSeleccionado}
          articulos={articulosActuales as Coleccion[]}
        />
      );

    case AutographType.Catalog:
      return (
        <Catalogo
          setVerImagen={setVerImagen}
          articuloSeleccionado={articuloSeleccionado}
          dict={dict}
          carrito={carrito}
          setArticuloSeleccionado={setArticuloSeleccionado}
          catalogo={articulosActuales?.[0] as CatalogoTipo}
          setCarrito={setCarrito}
          comprarPublicacion={comprarPublicacion}
          carritoCargando={carritoCargando}
          datosOraculos={datosOraculos}
          aprobarCargando={aprobarCargando}
          aprobarGastos={aprobarGastos}
          gastosAprobados={gastosAprobados}
          cumplimiento={cumplimiento}
          setCumplimiento={setCumplimiento}
          pagina={pagina}
          setPagina={setPagina}
        />
      );

    default: {
      return (
        <>
          {carrito?.abierto && (
            <CarritoAbierto
              comprarCarrito={comprarCarrito}
              setCarrito={setCarrito!}
              carrito={carrito!}
              cumplimiento={cumplimiento}
              setCumplimiento={setCumplimiento}
              dict={dict}
              datosOraculos={datosOraculos}
              aprobarCargando={aprobarCargando}
              aprobarGastos={aprobarGastos}
              gastosAprobados={gastosAprobados}
              carritoCargando={carritoCargando}
            />
          )}
        </>
      );
    }
  }
};

export default ComprasCambio;
