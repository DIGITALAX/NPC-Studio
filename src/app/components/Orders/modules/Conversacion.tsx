import { DIGITALAX_ADDRESS, INBOX_ID } from "@/app/lib/constants";
import descripcionRegex from "@/app/lib/helpers/descripcionRegex";
import { DecodedMessage } from "@xmtp/browser-sdk";
import { FunctionComponent, JSX } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { ConversacionProps } from "../types/orders.types";

const Conversacion: FunctionComponent<ConversacionProps> = ({
  mensaje,
  conversacion,
  address,
  setMensaje,
  enviarMensaje,
  mensajeCargando,
  dict,
  mensajeRef,
}): JSX.Element => {
  return (
    <div className="relative flex items-center justify-center w-full h-full sm:px-0 px-2">
      <div className="relative h-5/6 w-full flex bg-offNegro rounded-md border border-rosa flex-col items-start justify-centers">
        <div className="relative w-full h-full flex flex-col justify-between items-start">
          <div
            className={`relative w-full flex items-between justify-end overflow-y-scroll`}
            style={{
              height: "30rem",
            }}
            ref={mensajeRef as any}
          >
            {conversacion?.length > 0 ? (
              <div className="relative w-full h-fit min-h-full gap-3 flex flex-col items-end justify-end p-3 overflow-y-scroll">
                {conversacion?.map((item: DecodedMessage, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`relative w-full h-fit flex ${
                        item?.senderInboxId?.toLowerCase() !==
                        INBOX_ID?.toLowerCase()
                          ? "items-start justify-start"
                          : "items-end justify-end"
                      }`}
                    >
                      <div
                        className={`relative w-fit break-words h-fit px-2 py-1 flex rosaspace-preline  ${
                          item?.senderInboxId?.toLowerCase() ==
                          INBOX_ID?.toLowerCase()
                            ? "bg-rosa/70 border border-rosa text-xs font-cont text-black justify-end"
                            : "bg-amarillo/70 border border-amarillo text-xs font-cont text-black justify-start"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: descripcionRegex(
                            item?.content! ? item?.content : "???" as any,
                            true
                          ),
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="relative w-full flex h-full text-center items-center justify-center text-rosa font-cont text-xs">
                <div className="relative w-fit flex items-center justify-center h-fit break-words">
                  {dict.Home.NoMensaje}
                </div>
              </div>
            )}
          </div>
          <div
            className={`relative w-full h-28 border-t border-rosa flex items-center justify-start mb-auto font-cont text-rosa text-xs p-2`}
          >
            <textarea
              style={{ resize: "none" }}
              className="relative p-1 bg-offNegro flex text-left h-full w-full"
              onChange={(e) => setMensaje(e.target.value)}
              value={mensaje}
            ></textarea>
            <div
              className={`relative w-fit h-fit ${
                mensajeCargando
                  ? "animate-spin"
                  : "cursor-pointer active:scale-95"
              }`}
              onClick={() => enviarMensaje()}
            >
              {mensajeCargando ? (
                <AiOutlineLoading color="rosa" size={15} />
              ) : (
                <BsSend color="rosa" size={15} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversacion;
