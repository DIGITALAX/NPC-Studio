import { FunctionComponent, JSX } from "react";
import useSignless from "../hooks/useSignless";
import { AiOutlineLoading } from "react-icons/ai";
import { SignlessProps } from "../types/modals.types";

const Signless: FunctionComponent<SignlessProps> = ({
  setSignless,
  dict,
}): JSX.Element => {
  const { signlessLoading, handleSignless } = useSignless();
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer items-center justify-center font-bit"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSignless(false);
      }}
    >
      <div
        className="rounded-md text-white bg-black border border-brillo w-96 h-fit text-sm flex items-center justify-start p-3 cursor-default flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-fit pb-3 h-fit flex items-center justify-center uppercase text-center">
          {dict.Home.signless}
        </div>
        <div
          className={`relative px-3 py-1 flex items-center justify-center rounded-md bg-black border border-white w-28 h-8 ${
            !signlessLoading && "cursor-pointer active:scale-95"
          }`}
          onClick={() => !signlessLoading && handleSignless()}
        >
          {signlessLoading ? (
            <AiOutlineLoading
              size={15}
              color="white"
              className="animate-spin"
            />
          ) : (
            dict.Home.enable
          )}
        </div>
      </div>
    </div>
  );
};

export default Signless;
