"use client";

import { ModalContext } from "@/app/providers";
import { useContext, useEffect } from "react";
import Error from "./Error";
import Signless from "./Signless";
import Index from "./Index";
import { Indexar } from "../../Common/types/common.types";
import VerMedios from "./VerMedios";
import CrearCuenta from "./CrearCuenta";
import Connect from "./Connect";
import Perfil from "./Perfil";
import Gifs from "./Gifs";
import SimpleCollect from "./SimpleCollect";
import CollectConfig from "./CollectConfig";
import MakeCita from "./Cita";
import { getOracleData } from "../../../../../graphql/queries/getOracleData";
import PublicacionConectada from "./PublicacionConectada";
import Notificacion from "./Notificacion";
import { Notificacion as NotificacionType } from "../types/modals.types";

export default function ModalsInternal({ dict }: { dict: any }) {
  const contexto = useContext(ModalContext);

  const manejarOraculos = async (): Promise<void> => {
    try {
      const datos = await getOracleData();
      contexto?.setOraculos(datos?.data?.currencyAddeds);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (Number(contexto?.oraculos?.length) < 1) {
      manejarOraculos();
    }
  }, [contexto?.oraculos]);
  return (
    <>
      {contexto?.citaAbierta?.open && <MakeCita dict={dict} />}
      {contexto?.mostrarPerfil && (
        <Perfil setMostrarPerfil={contexto?.setMostrarPerfil!} dict={dict} />
      )}
      {contexto?.verImagen?.abierto && (
        <VerMedios
          setVerImagen={contexto?.setVerImagen!}
          verImagen={contexto?.verImagen!}
        />
      )}
      {contexto?.gifs?.open && <Gifs dict={dict} />}
      {contexto?.collectOptions?.open && <CollectConfig dict={dict} />}
      {contexto?.simpleCollect?.open && <SimpleCollect dict={dict} />}

      {contexto?.connect && (
        <Connect
          dict={dict}
          lensConectado={contexto?.lensConectado!}
          setConnect={contexto?.setConnect}
        />
      )}
      {contexto?.crearCuenta && (
        <CrearCuenta dict={dict} setCreateAccount={contexto?.setCrearCuenta!} />
      )}
      {contexto?.conectarPub && <PublicacionConectada dict={dict} />}
      {contexto?.signless && (
        <Signless setSignless={contexto?.setSignless} dict={dict} />
      )}
      {contexto?.mostrarNotificacion !== NotificacionType.Inactivo && (
        <Notificacion dict={dict} />
      )}
      {contexto?.error && (
        <Error error={contexto?.error} setError={contexto?.setError} />
      )}
      {contexto?.indexar !== Indexar.Inactivo && (
        <Index dict={dict} tipo={contexto?.indexar!} />
      )}
    </>
  );
}
