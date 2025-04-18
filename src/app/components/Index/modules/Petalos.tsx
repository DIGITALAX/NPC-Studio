import { FunctionComponent } from "react";

const Petalos: FunctionComponent<{
  puntaje: number;
  total: number;
  titulo: string;
  colorUno: string;
  colorDos: string;
}> = ({ puntaje, total, titulo, colorDos, colorUno }) => {
  const porcentaje = (puntaje / total) * 100;
  const petalos = 24;
  const petalosLlenados = Math.round((porcentaje / 100) * petalos);

  return (
    <div className="relative w-full h-fit flex flex-col items-center justify-center gap-3">
      <div className="relative sm:w-3/4 w-full h-fit text-xxs font-lib text-white break-words text-center">
        {titulo}
      </div>
      <div className="relative w-full h-28 flex justify-center items-center">
        <div className="relative w-full h-full">
          {[...Array(petalos)].map((_, index) => {
            const angle = (index * 360) / petalos; 
            const radius = 50; 
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  width: "2px",
                  height: `${radius}px`,
                  backgroundColor:
                    index < petalosLlenados ? colorUno : colorDos,
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "center bottom",
                  left: "50%",
                  top: "50%",
                  marginLeft: "-1px",
                  marginTop: `-${radius}px`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Petalos;
