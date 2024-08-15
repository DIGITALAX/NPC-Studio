import { FunctionComponent } from "react";
import { TextoProps } from "../types/common.types";
import descripcionRegex from "@/lib/helpers/descripcionRegex";

const Texto: FunctionComponent<TextoProps> = ({ metadata }): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex flex-col justify-start items-center gap-3">
      <div
        className={`relative w-full h-fit max-h-[20rem] font-aust text-left items-start justify-start break-all flex overflow-y-scroll p-3 text-sm whitespace-preline ${
          metadata?.__typename !== "TextOnlyMetadataV3" &&
          metadata?.content?.length > 150
            ? "bg-rosa text-black"
            : "bg-oscuro text-white"
        }`}
        dangerouslySetInnerHTML={{
          __html: descripcionRegex(
            metadata?.content,
            metadata?.__typename !== "TextOnlyMetadataV3" &&
              metadata?.content?.length > 150
              ? false
              : true
          ),
        }}
      ></div>
    </div>
  );
};

export default Texto;
