import { INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent } from "react";

const Puntaje: FunctionComponent = () => {
  return (
    <div className="relative w-full h-fit flex flex-col md:flex-row gap-3 items-center justify-center">
      <div className="relative w-full h-[32rem] flex flex-col items-center justify-center gap-3">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full top-0 left-0 flex">
            <Image
              // src={`${INFURA_GATEWAY}/ipfs/QmfCuETzCFcyrAv9BZ1f9g3HuuU7WqMBdSeuUaKiR3H62y`}
              src={`${INFURA_GATEWAY}/ipfs/QmfFa8nLEdet2pLLoXdfYnLTGQv1rsRMCVoB5m87brGoRa`}
              
              layout="fill"
              objectFit="fill"
              draggable={false}
            />
          </div>
        </div>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full top-0 left-0 flex">
            <Image
              // src={`${INFURA_GATEWAY}/ipfs/QmfCuETzCFcyrAv9BZ1f9g3HuuU7WqMBdSeuUaKiR3H62y`}
              src={`${INFURA_GATEWAY}/ipfs/QmPEKw6mahAgwHZAoxC5k54Mg5XkXaacMPG2KXv6oSW3eM`}
              layout="fill"
              objectFit="fill"
              draggable={false}
            />
          </div>
        </div>
      </div>
      <div className="relative w-full h-[32rem] flex items-center justify-center">
        <div className="absolute w-full h-full top-0 left-0 flex">
          <Image
            // src={`${INFURA_GATEWAY}/ipfs/QmfCuETzCFcyrAv9BZ1f9g3HuuU7WqMBdSeuUaKiR3H62y`}
            src={`${INFURA_GATEWAY}/ipfs/QmZw3WzqwLwxFrk6wVbsg1Fobyi3mJHg1RnWGWci9FX5s9`}
            layout="fill"
            objectFit="fill"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Puntaje;
