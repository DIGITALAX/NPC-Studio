import { FunctionComponent } from "react";
import Typist from "react-typist";
import messages from "./../../../../public/conversation.json";
import { ChatProps } from "../types/game.types";

const Chat: FunctionComponent<ChatProps> = ({
  indiceMensajeActual,
  handleCompletarTyping,
  indiceConversacionActual,
  contenedorMensajesRef,
  open,
}): JSX.Element => {
  return (
    <div
      className={`relative w-full flex flex-col items-start justify-start font-at text-base leading-4 max-w-full text-white overflow-y-scroll break-all ${
        open ? "h-96" : "h-full"
      }`}
      key={indiceConversacionActual}
      ref={contenedorMensajesRef}
    >
      {messages[indiceConversacionActual]
        .slice(0, indiceMensajeActual + 1)
        .map((msg, index) => (
          <div key={index}>
            {index === indiceMensajeActual ? (
              <Typist
                onTypingDone={handleCompletarTyping}
                cursor={{ hideWhenDone: true, hideWhenDoneDelay: 500 }}
              >
                <span style={{ color: msg.color }}>
                  {msg.name} ({msg.team}):
                </span>
                <span
                  style={{
                    color: msg.base,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {" "}
                  {msg.message}
                  <br /> <br />
                </span>
              </Typist>
            ) : (
              <p>
                <span style={{ color: msg.color }}>
                  <strong>
                    {msg.name} ({msg.team}):{" "}
                  </strong>
                </span>
                <span
                  style={{
                    color: msg.base,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {" "}
                  {msg.message}
                  <br /> <br />
                </span>
              </p>
            )}
          </div>
        ))}
    </div>
  );
};

export default Chat;
