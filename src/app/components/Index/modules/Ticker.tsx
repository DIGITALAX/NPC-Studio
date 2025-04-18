import { FunctionComponent, JSX } from "react";
import { TickerProps } from "../types/index.type";
import MarqueeText from "react-fast-marquee";

const Ticker: FunctionComponent<TickerProps> = ({
  agentCollections,
  pantalla,
}): JSX.Element => {
  return (
    <div className="absolute w-full h-full top-0 left-0 flex overflow-hidden">
      <MarqueeText
        gradient={false}
        speed={100}
        direction={"left"}
        pauseOnHover
        className="z-0"
      >
        <div
          className={`flex flex-row lg:flex-col items-center justify-start relative gap-6 overflow-hidden ${
            pantalla ? "h-screen w-full" : "w-screen h-full"
          }`}
        >
          {agentCollections?.map((elemento, indice: number) => {
            return (
              <div
                key={indice}
                className={`relative w-full h-full whitespace-nowrap flex items-center justify-center ${
                  pantalla && "rotate-90"
                }`}
              >
                {`${elemento?.etiqueta}: ${elemento?.collections?.length}`} -- $
                {elemento?.collections?.reduce(
                  (sum, el) => sum + Number(el?.precio),
                  0
                ) || 0.0}
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Ticker;
