import { FunctionComponent, JSX } from "react";
import { CumplimientoProps } from "../types/common.types";

const Cumplimiento: FunctionComponent<CumplimientoProps> = ({
  dict,
  setCumplimiento,
  setColor,
  color,
  setTamano,
  tamano,
  abierto,
  cumplimiento,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col items-start justify-start gap-3 font-bit text-white">
      <div
        className={`relative w-full h-fit flex text-base md:text-2xl ${
          abierto ? "justify-center" : "justify-center sm:justify-start"
        }`}
      >
        {dict.Home.cump}
      </div>
      <div
        className={`relative flex flex-row flex-wrap items-end gap-5 w-full h-full ${
          abierto ? "justify-center" : "justify-center sm:justify-start"
        }`}
      >
        {[
          {
            titulo: dict.Home.nombre,
            valor: "nombre",
            campo: cumplimiento?.nombre,
          },
          {
            titulo: dict.Home.direccion,
            valor: "direccion",
            campo: cumplimiento?.direccion,
          },
          {
            titulo: "zip",
            valor: "zip",
            campo: cumplimiento?.zip,
          },
          {
            titulo: dict.Home.ciudad,
            valor: "ciudad",
            campo: cumplimiento?.ciudad,
          },
          {
            titulo: dict.Home.estado,
            valor: "estado",
            campo: cumplimiento?.estado,
          },
          {
            titulo: dict.Home.pais,
            valor: "pais",
            campo: cumplimiento?.pais,
          },
        ].map(
          (
            elemento: {
              titulo: string;
              valor: string;
              campo: string;
            },
            indice: number
          ) => {
            return (
              <div
                key={indice}
                className={`relative w-fit h-fit flex items-start justify-center flex-col gap-2`}
              >
                <div className="relative w-fit h-fit flex text-xxs md:text-sm uppercase">
                  {elemento?.titulo}
                </div>
                <input
                  key={elemento?.valor}
                  className={`relative border rounded-md flex text-xxs md:text-sm p-1 h-8 w-32 ${
                    abierto
                      ? "border-ligero bg-black"
                      : "border-white bg-oscuro"
                  }`}
                  value={elemento?.campo}
                  onChange={(e) => {
                    setCumplimiento((prev) => ({
                      ...prev,
                      [elemento?.valor?.toLowerCase()]: e.target.value,
                    }));
                  }}
                />
              </div>
            );
          }
        )}
      </div>
      {setColor && setTamano && (
        <div className="relative w-full h-fit flex items-center justify-center flex-col gap-3">
          <div className="relative w-fit h-fit flex flex-row gap-1.5 items-start justify-center">
            {["xs", "s", "m", "l", "xl", "2xl"].map(
              (t: string, indice: number) => {
                return (
                  <div
                    key={indice}
                    className={`relative w-7 h-7 flex items-center justify-center border border-white text-xxs md:text-xs cursor-pointer active:scale-95 rounded-full ${
                      tamano == t && "opacity-40"
                    }`}
                    onClick={() => setTamano!(t)}
                  >
                    {t}
                  </div>
                );
              }
            )}
          </div>
          <div className="relative w-fit h-fit flex flex-row gap-1.5 items-start justify-center">
            {["black", "white"].map((c: string, indice: number) => {
              return (
                <div
                  key={indice}
                  className={`relative w-7 h-7 flex items-center justify-center cursor-pointer border border-white active:scale-95 rounded-full ${
                    c == color && "opacity-40"
                  }`}
                  style={{
                    backgroundColor: c,
                  }}
                  onClick={() => setColor!(c)}
                ></div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cumplimiento;
