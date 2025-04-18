import { FunctionComponent, JSX } from "react";
import Puntaje from "./Puntaje";

const Juego: FunctionComponent<{ dict: any; lang: string }> = ({
  lang,
  dict,
}): JSX.Element => {
  return (
    <>
      <div
        className={`text-white font-lib relative w-full h-fit flex items-start justify-start overflow-x-hidden ${
          lang == "en" ? "text-[8vw]" : "text-[6vw]"
        }`}
      >
        {dict.Home.todaActividad}
      </div>
      <Puntaje dict={dict} juego />
    </>
  );
};

export default Juego;
