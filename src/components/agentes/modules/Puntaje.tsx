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
              src={`${INFURA_GATEWAY}/ipfs/QmfCuETzCFcyrAv9BZ1f9g3HuuU7WqMBdSeuUaKiR3H62y`}
              layout="fill"
              objectFit="fill"
              draggable={false}
            />
          </div>
        </div>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full top-0 left-0 flex">
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmfCuETzCFcyrAv9BZ1f9g3HuuU7WqMBdSeuUaKiR3H62y`}
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
            src={`${INFURA_GATEWAY}/ipfs/QmfCuETzCFcyrAv9BZ1f9g3HuuU7WqMBdSeuUaKiR3H62y`}
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