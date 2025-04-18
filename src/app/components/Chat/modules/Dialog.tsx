import Draggable from "react-draggable";
import { FunctionComponent } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { DialogProps } from "../../Common/types/common.types";
import Chat from "./Chat";

const Dialog: FunctionComponent<DialogProps> = ({
  setDragDialog,
  wrapperRef,
  dict,
  router
}) => {
  return (
    <Draggable ref={wrapperRef} cancel=".close" enableUserSelectHack={false}>
      <div className="absolute w-full sm:w-96 z-200 h-fit flex flex-col items-start justify-start p-2 rounded-md border-4 border-white bg-black/80 cursor-grab active:cursor-grabbing gap-6">
        <div className="relative w-full h-fit flex items-start justify-start flex-col gap-3">
          <div className="close" onClick={() => setDragDialog(false)}>
            <IoIosCloseCircle size={20} color="white" />
          </div>
          <Chat router={router} dict={dict} abierto />
        </div>
      </div>
    </Draggable>
  );
};

export default Dialog;
