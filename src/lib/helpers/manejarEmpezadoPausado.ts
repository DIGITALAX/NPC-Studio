import { MutableRefObject } from "react";
import WaveSurfer from "wavesurfer.js";

const manejarEmpezadoPausado = (
  wavesurfer: MutableRefObject<WaveSurfer | null>,
  tipo: string,
  empezado: boolean,
  manejarVideoEmpezado: () => void,
  manejarVideoPausado: () => void
) => {
  try {
    if (wavesurfer.current) {
      if (tipo === "video") {
        if (!empezado) {
            manejarVideoEmpezado();
          wavesurfer.current.play();
        } else {
            manejarVideoPausado();
          wavesurfer.current.pause();
        }
      } else {
        if (wavesurfer.current.isPlaying()) {
          wavesurfer.current.pause();
        } else {
          wavesurfer.current.play();
        }
      }
    }
  } catch (err: any) {
    console.error(err.message);
  }
};

export default manejarEmpezadoPausado;
