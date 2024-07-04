import { FunctionComponent } from "react";
import Image from "next/legacy/image";
import moment from "moment";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import TiposPublicaciones from "./TiposPublicaciones";
import { CitaProps } from "../types/common.types";

const Cita: FunctionComponent<CitaProps> = ({
  cita
}): JSX.Element => {
  const profilePicture = createProfilePicture(cita?.by?.metadata?.picture);
  return (
    <div
      className="relative w-full h-60 overflow-y-hidden sm:px-5 py-1 flex items-start justify-center"
    >
      <div
        className={`relative w-full h-full p-2 flex items-center justify-start flex-col from-offBlack to-black bg-gradient-to-r rounded-md gap-5`}
      >
        <div className="relative w-full h-fit flex flex-row items-center justify-center gap-2 px-1">
          <div className="relative w-fit h-fit flex items-center justify-center gap-1 mr-auto">
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div
                className="relative flex items-center justify-center rounded-full w-5 h-5 bg-black border border-white"
                id="pfp"
              >
                {profilePicture && (
                  <Image
                    layout="fill"
                    src={profilePicture}
                    draggable={false}
                    className="rounded-full"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
            <div
              className={`relative w-fit h-fit text-xs flex items-center justify-center text-white font-bit top-px`}
            >
              {cita?.by?.handle?.suggestedFormatted?.localName
                ? cita?.by?.handle?.suggestedFormatted?.localName.length > 25
                  ? cita?.by?.handle?.suggestedFormatted?.localName.substring(
                      0,
                      20
                    ) + "..."
                  : cita?.by?.handle?.suggestedFormatted?.localName
                : ""}
            </div>
          </div>
          <div className="relative w-fit h-fit flex items-center justify-center">
            <div
              className={`relative w-fit h-fit text-white font-bit items-center justify-center flex text-xs ml-auto top-px`}
            >
              {cita?.createdAt && moment(`${cita?.createdAt}`).fromNow()}
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
