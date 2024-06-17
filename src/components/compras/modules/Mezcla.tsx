import { FunctionComponent } from "react";
import { MezclaProps } from "../types/compras.types";
import Botones from "./Botones";

const Mezcla: FunctionComponent<MezclaProps> = ({
  setCarrito,
  carritoCargando,
  articuloSeleccionado,
}): JSX.Element => {
  return (
    <div>

      
      <Botones
        articulo={articuloSeleccionado}
        setCarrito={setCarrito}
        carritoCargando={carritoCargando}
      />
    </div>
  );
};

export default Mezcla;
