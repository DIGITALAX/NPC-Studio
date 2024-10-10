import { Atributos } from "@/components/post/types/post.types";
import { FunctionComponent } from "react";

const Ticker: FunctionComponent<{ atributos: Atributos | undefined }> = ({
  atributos,
}): JSX.Element => {
  return (
    <div className="flex flex-row lg:flex-col items-center justify-start relative gap-72 overflow-hidden w-auto h-auto">
      {[
        {
          titulo: "K_MEANS",
          valor: atributos?.mensaje?.k_means_respuesta,
        },

        {
          titulo: "V_MEANS",
          valor: atributos?.mensaje?.v_means_respuesta,
        },
        {
          titulo: "K_MAX",
          valor: atributos?.mensaje?.key_maxs_respuesta,
        },
        {
          titulo: "V_MAX",
          valor: atributos?.mensaje?.value_maxs_respuesta,
        },
        {
          titulo: "K_MIN",
          valor: atributos?.mensaje?.key_mins_respuesta,
        },
        {
          titulo: "V_MIN",
          valor: atributos?.mensaje?.value_mins_respuesta,
        },
        {
          titulo: "K_ST_D",
          valor: atributos?.mensaje?.key_std_devs_respuesta,
        },
        {
          titulo: "V_ST_D",
          valor: atributos?.mensaje?.value_std_devs_respuesta,
        },
        {
          titulo: "TOKEN_MEANS",
          valor: atributos?.mensaje?.token_means_respuesta,
        },
        {
          titulo: "FFN_INP_MAX",
          valor: atributos?.mensaje?.ffn_inp_maxs,
        },
        {
          titulo: "FFN_INP_MIN",
          valor: atributos?.mensaje?.ffn_inp_mins,
        },
        {
          titulo: "FFN_INP_MEANS",
          valor: atributos?.mensaje?.ffn_inp_means,
        },
        {
          titulo: "FFN_INP_ST_D",
          valor: atributos?.mensaje?.ffn_inp_std_devs,
        },
        {
          titulo: "FFN_OUT_MAX",
          valor: atributos?.mensaje?.ffn_out_maxs,
        },
        {
          titulo: "FFN_OUT_MIN",
          valor: atributos?.mensaje?.ffn_out_mins,
        },
        {
          titulo: "FFN_OUT_MEANS",
          valor: atributos?.mensaje?.ffn_out_means,
        },
        {
          titulo: "FFN_OUT_ST_D",
          valor: atributos?.mensaje?.ffn_out_std_devs,
        },
      ]?.map(
        (
          elemento: {
            titulo: string;
            valor: number | undefined;
          },
          indice: number
        ) => {
   
          return (
            <div
              key={indice}
              className={`relative w-fit h-fit flex lg:rotate-90 items-center justify-center flex-row gap-12 overflow-hidden`}
            >
              <div className="relative w-fit h-fit flex items-center justify-center text-limon">
                {elemento.titulo}
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center pr-10">
                {elemento.valor || 0.0}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Ticker;
