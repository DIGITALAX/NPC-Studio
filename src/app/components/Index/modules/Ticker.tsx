import { FunctionComponent, JSX } from "react";
import { TickerProps } from "../types/index.type";
import MarqueeText from "react-fast-marquee";

const Ticker: FunctionComponent<TickerProps> = ({
  agentCollections,
}): JSX.Element => {
  return (
    <MarqueeText
      gradient={false}
      speed={50}
      direction={"left"}
      pauseOnHover
      className="z-0 flex flex-row items-center justify-center relative gap-20 w-full h-full text-xs overflow-x-visible lg:rotate-90"
    >
      {agentCollections?.map((elemento, indice: number) => {
        return (
          <div
            key={indice}
            className={`relative w-fit h-fit whitespace-nowrap flex items-center justify-center px-3`}
          >
            {`${elemento?.etiqueta}: ${elemento?.collections?.length}`} -- $
            {elemento?.collections
              ?.reduce((sum, el) => sum + Number(el?.precio) / 10 ** 18, 0)
              .toFixed(2) || 0.0}
          </div>
        );
      })}
    </MarqueeText>
  );
};

export default Ticker;
