import { HistoriaProps } from "@/components/post/types/post.types";
import { FunctionComponent } from "react";

const Historia: FunctionComponent<HistoriaProps> = ({
  historia,
  dict,
}): JSX.Element => {
  return (
    <div className="relative w-full flex items-start justify-start h-fit flex-col gap-2">
      <div className="text-white text-sm font-lib flex items-center justify-center">
        {dict.Home.historia}
      </div>
      {historia?.length > 0 ? (
        <div className="relative w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"></div>
      ) : (
        <div className="relative font-lib text-xxs text-costa w-fit h-fit flex items-center text-left">
          {dict.Home.noHistoria}
        </div>
      )}
    </div>
  );
};

export default Historia;
