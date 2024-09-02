import { CARTAS, INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent } from "react";

const Agentes: FunctionComponent = () => {
  return (
    <div className="relative w-full h-fit flex flex-col items-center justify-center gap-8">
      <div className="relative w-full h-fit grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 gap-6">
        {CARTAS.map((elemento, i) => {
          return (
            <div
              key={i}
              className="relative w-full h-96 flex items-stretch justify-start flex-col"
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/${elemento}`}
                layout="fill"
                objectFit="fill"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
      <div className="relative w-full h-fit flex items-center justify-center">
        <div className="relative w-20 h-8 flex items-center justify-center cursor-pointer hover:opacity-70">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
            layout="fill"
            objectFit="fill"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Agentes;
