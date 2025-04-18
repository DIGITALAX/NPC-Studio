import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent, JSX, useContext } from "react";
import { ModalContext } from "@/app/providers";
import useSimpleCollect from "../hooks/useSimpleCollect";
import { AiOutlineLoading } from "react-icons/ai";
import moment from "moment";

export const SimpleCollect: FunctionComponent<{ dict: any }> = ({
  dict,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const action = contexto?.simpleCollect?.post?.actions?.find(
    (action) => action.__typename == "SimpleCollectAction"
  );
  const { hacerSimpleCollect, simpleCollectCargando } = useSimpleCollect(dict);

  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contexto?.setSimpleCollect({
          open: false,
        });
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro border border-white rounded-md cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center">
          <Image
            draggable={false}
            layout="fill"
            objectFit="cover"
            src={`${INFURA_GATEWAY}/ipfs/QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC`}
          />
          <div
            className={`flex flex-col items-center py-2 sm:py-10 px-2 sm:px-4 gap-5 text-white font-bit relative w-[75%] h-[65%] items-start justify-center flex overflow-y-scroll`}
          >
            <div className="relative w-full items-center justify-start flex flex-col gap-6 h-fit">
              <div
                className={`relative rounded-md flex flex-col gap-5 w-5/6 p-2 items-center justify-center w-full h-fit font-aust text-white text-sm`}
              >
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.red}
                </div>
                <div className="relative w-3/4 xl:w-1/2 items-center justify-center rounded-md border border-white h-60 flex">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/QmQf3pEG3AXMn5xqRN8Kd8eAC7pEvFoCKvXoycZDpB44Km`}
                    objectFit="cover"
                    layout="fill"
                    className="rounded-md"
                    draggable={false}
                  />
                </div>
                {action?.endsAt && (
                  <div className="relative w-fit h-fit flex items-center justify-center font-bit break-words px-2 text-center">
                    {new Date(action?.endsAt).getTime() < Date.now()
                      ? dict.Home.over
                      : `${dict.Home.fin} ${
                          moment
                            .duration(moment(action?.endsAt).diff(moment()))
                            .asMilliseconds() > 0
                            ? `${moment
                                .utc(moment(action?.endsAt).diff(moment()))
                                .format("H [hrs]")} and ${moment
                                .utc(moment(action?.endsAt).diff(moment()))
                                .format("m [min]")}`
                            : dict.Home.hr
                        }`}
                  </div>
                )}
                {Number(action?.collectLimit) > 0 && (
                  <div className="relative w-fit h-fit flex items-center justify-center font-bit text-base text-center">
                    {contexto?.simpleCollect?.post?.stats?.collects} /{" "}
                    {action?.collectLimit}
                  </div>
                )}
                {action?.payToCollect?.amount &&
                  Number(action?.payToCollect?.amount?.value) > 0 && (
                    <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-2 font-bit text-base text-sol">
                      <div className="relative w-fit h-fit flex items-center justify-center">
                        {action?.payToCollect?.amount?.value}
                      </div>
                      <div className="relative w-fit h-fit flex items-center justify-center">
                        {action?.payToCollect?.amount?.asset?.symbol}
                      </div>
                    </div>
                  )}
              </div>
              <div
                className={`relative min-w-32 w-fit h-8 py-1 px-2 border border-white rounded-md font-aust text-white bg-black flex items-center justify-center text-xs ${
                  !simpleCollectCargando && "cursor-pointer active:scale-95"
                }`}
                onClick={() => !simpleCollectCargando && hacerSimpleCollect()}
              >
                <div
                  className={`relative w-fit h-fit flex items-center justify-center ${
                    simpleCollectCargando && "animate-spin"
                  }`}
                >
                  {simpleCollectCargando ? (
                    <AiOutlineLoading size={15} color={"white"} />
                  ) : Number(contexto?.simpleCollect?.post?.stats?.collects) ==
                      Number(action?.collectLimit) &&
                    Number(action?.collectLimit) > 0 ? (
                    dict.Home.agotado
                  ) : (
                    dict.Home.Collect
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCollect;
