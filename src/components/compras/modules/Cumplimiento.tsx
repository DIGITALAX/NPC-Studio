import { FunctionComponent } from "react";
import { CumplimientoProps } from "../types/compras.types";

const Cumplimiento: FunctionComponent<CumplimientoProps> = ({
  dict,
  setCumplimiento,
  cumplimiento,
  setColor,
  color,
  setTamano,
  tamano,
  abierto,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col items-start justify-start gap-3 font-bit text-white">
      <div
        className={`relative w-full h-fit flex text-2xl ${
          abierto ? "justify-center" : "justify-start"
        }`}
      >
        {dict.Home.cump}
      </div>
      <div
        className={`relative flex flex-row flex-wrap items-end gap-5 w-full h-full ${
          abierto ? "justify-center" : "justify-start"
        }`}
      >
        {[
          {
            titulo: dict.Home.nombre,
            valor: "nombre",
          },
          {
            titulo: dict.Home.direccion,
            valor: "direccion",
          },
          {
            titulo: "zip",
            valor: "zip",
          },
          {
            titulo: dict.Home.ciudad,
            valor: "ciudad",
          },
          {
            titulo: dict.Home.estado,
            valor: "estado",
          },
          {
            titulo: dict.Home.pais,
            valor: "pais",
          },
        ].map(
          (
            elemento: {
              titulo: string;
              valor: string;
            },
            indice: number
          ) => {
            return (
              <div
                key={indice}
                className={`relative w-fit h-fit flex items-start justify-center flex-col gap-2`}
              >
                <div className="relative w-fit h-fit flex text-sm uppercase">
                  {elemento?.titulo}
                </div>
                <input
                  className={`relative border rounded-md flex  text-sm p-1 h-8 w-32 ${
                    abierto
                      ? "border-ligero bg-black"
                      : "border-white bg-oscuro"
                  }`}
                  placeholder={
                    (cumplimiento as any)?.[elemento?.titulo?.toLowerCase()] ||
                    ""
                  }
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
      {color && tamano && (
        <div className="relative w-fit h-fit flex items-center justify-center flex-col gap-3">
          <div className="relative w-fit h-fit flex flex-row gap-1.5 items-start justify-center">
            {["xs", "s", "m", "l", "xl", "2xl"].map(
              (t: string, indice: number) => {
                return (
                  <div
                    key={indice}
                    className={`relative w-7 h-7 flex items-center justify-center border border-white text-xs cursor-pointer active:scale-95 rounded-full ${
                      tamano == t && "opacity-80"
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
                    c == color && "opacity-80"
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