import { FunctionComponent, JSX } from "react";
import Image from "next/legacy/image";
import moment from "moment";
import TiposPublicaciones from "./TiposPublicaciones";
import { CitaProps } from "../types/chat.types";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const Cita: FunctionComponent<CitaProps> = ({
  cita,
  setMostrarPerfil,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full grow min-h-60 overflow-y-hidden sm:px-5 py-1 flex items-start justify-center">
      <div
        className={`relative w-full h-full p-2 flex items-center justify-start flex-col from-offBlack to-black bg-gradient-to-r rounded-md gap-5`}
      >
        <div className="relative w-full h-fit flex flex-row items-center justify-center gap-2 px-1">
          <div
            className="relative w-fit h-fit flex items-center justify-center gap-1 mr-auto cursor-pointer active:scale-95"
            onClick={() => setMostrarPerfil(cita?.author?.address)}
          >
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div className="relative flex items-center justify-center rounded-full w-5 h-5 bg-black border border-white">
                {cita?.author?.metadata?.picture && (
                  <Image
                    layout="fill"
                    src={handleProfilePicture(cita?.author?.metadata?.picture)}
                    draggable={false}
                    className="rounded-full"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
            <div
              className={`relative w-fit h-fit text-xxs flex items-center justify-center text-white font-bit top-px break-all`}
            >
              {cita?.author?.username?.localName
                ? cita?.author?.username?.localName.length > 25
                  ? cita?.author?.username?.localName.substring(0, 20) + "..."
                  : cita?.author?.username?.localName
                : ""}
            </div>
          </div>
          <div className="relative w-fit h-fit flex items-center justify-center">
            <div
              className={`relative w-fit h-fit text-white font-bit items-center justify-center flex text-xxs ml-auto top-px`}
            >
              {cita?.timestamp && moment(`${cita?.timestamp}`).fromNow()}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex items-start justify-center">
          <TiposPublicaciones elemento={cita} />
        </div>
      </div>
    </div>
  );
};

export default Cita;
