"use client";

import { SetStateAction } from "react";
import useConfig from "../hooks/useConfig";
import PantallaComprar from "@/components/common/modules/PantallaComprar";
import { AutographType, DatosOraculos, Dictionary, Escena } from "../types/game.types";
import { Compra } from "@/components/compras/types/compras.types";
import useArticulo from "@/components/compras/hooks/useArticulo";
import { Profile } from "../../../../graphql/generated";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import useCompras from "@/components/compras/hooks/useCompras";
import { PublicClient } from "viem";
import { Indexar, Notificacion } from "@/components/common/types/common.types";

function Studio({
  npc,
  escena,
  setNpc,
  setCargando,
  cargando,
  manejarMostrarArticulo,
  setManejarMostrarArticulo,
  carrito,
  setCarrito,
  dict,
  cliente,
  address,
  lensConectado,
  publicClient,
  datosOraculos,
  setVerImagen,
  setIndexar,
  setErrorInteraccion,
  setMostrarNotificacion,
  setEscenas,
  escenas
}: {
  npc: string | undefined;
  escena: string;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
  publicClient: PublicClient;
  setNpc: (e: SetStateAction<string | undefined>) => void;
  setCargando: (e: SetStateAction<boolean>) => void;
  cargando: boolean;
  cliente: LitNodeClient;
  address: `0x${string}` | undefined;
  lensConectado: Profile | undefined;
  dict: Dictionary;
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
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        disenador: string;
        tipo: AutographType;
      }
    | undefined;
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
  datosOraculos: DatosOraculos[];
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  setEscenas: (e: SetStateAction<Escena[]>) => void;
  escenas: Escena[]
}) {
  const { gameRef } = useConfig(
    npc,
    escena,
    setNpc,
    setCargando,
    setManejarMostrarArticulo,
    manejarMostrarArticulo,
    carrito?.abierto,
    setEscenas,
    escenas
  );
  const {
    articuloCargando,
    articulosActuales,
    articuloSeleccionado,
    setArticuloSeleccionado,
    setArticuloIndice,
    articuloIndice,
    pagina,
    setPagina,
  } = useArticulo(manejarMostrarArticulo, lensConectado);
  const {
    carritoCargando,
    comprarCarrito,
    cumplimiento,
    comprarPublicacion,
    aprobarGastos,
    aprobarCargando,
    setCumplimiento,
    gastosAprobados,
  } = useCompras(
    carrito,
    setCarrito,
    cliente,
    address,
    lensConectado,
    publicClient,
    articuloSeleccionado,
    datosOraculos,
    setIndexar,
    setErrorInteraccion,
    setMostrarNotificacion,
    setManejarMostrarArticulo
  );

  return (
    <>
      <div
        ref={gameRef as any}
        className={`relative w-full h-full flex items-start justify-start ${
          cargando && "animate-pulse"
        }`}
      />
      {(manejarMostrarArticulo || carrito.abierto) && (
        <PantallaComprar
          carrito={carrito}
          pagina={pagina}
          setPagina={setPagina}
          dict={dict}
          datosOraculos={datosOraculos}
          articuloIndice={articuloIndice}
          setArticuloIndice={setArticuloIndice}
          setArticuloSeleccionado={setArticuloSeleccionado}
          articuloSeleccionado={articuloSeleccionado}
          manejarMostrarArticulo={manejarMostrarArticulo}
          setManejarMostrarArticulo={setManejarMostrarArticulo}
          setCarrito={setCarrito}
          carritoCargando={carritoCargando}
          comprarPublicacion={comprarPublicacion}
          articuloCargando={articuloCargando}
          articulosActuales={articulosActuales}
          aprobarGastos={aprobarGastos}
          aprobarCargando={aprobarCargando}
          setCumplimiento={setCumplimiento}
          gastosAprobados={gastosAprobados}
          setVerImagen={setVerImagen}
          cumplimiento={cumplimiento}
          comprarCarrito={comprarCarrito}
        />
      )}
    </>
  );
}

export default Studio;
