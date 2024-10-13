import { Dictionary } from "@/components/game/types/game.types";
import { SetStateAction } from "react";
import { Profile } from "../../../../graphql/generated";

export interface Atributos {
  images: string[];
  metadata_uri: string;
  locale: string;
  eleccion: string;
  comentario_perfil: string;
  comentario_pub: string;
  perfil_id: string;
  coleccion_id: string;
  pagina: string;
  mensaje: {
    inputs_prompt: string;
    outputs_prompt: string;
    res_prompt: string;
    inputs_respuesta: string;
    outputs_respuesta: string;
    res_respuesta: string;
    input_tokens: number[];
    output_tokens: number[];
    token_means_respuesta: number;
    k_means_respuesta: number;
    v_means_respuesta: number;
    value_std_devs_respuesta: number;
    value_maxs_respuesta: number;
    value_mins_respuesta: number;
    key_std_devs_respuesta: number;
    key_maxs_respuesta: number;
    key_mins_respuesta: number;
    ffn_out_std_devs: number;
    ffn_out_maxs: number;
    ffn_out_mins: number;
    ffn_out_means: number;
    ffn_inp_std_devs: number;
    ffn_inp_maxs: number;
    ffn_inp_mins: number;
    ffn_inp_means: number;
    output: string;
  };
  version: number;
  prompt: string;
  model: string;
  options: {
    tokenizer: string;
    ctx: string;
    num_tokens: string;
  };
  hashes: string[];
}

export type EvaluacionProps = {
  dict: Dictionary;
  votarCargando: boolean;
  manejarVotar: () => Promise<void>;
  pubVotar: PubVote;
  setPubVotar: (e: SetStateAction<PubVote>) => void;
};

export interface PubVote {
  comment: string;
  model: number;
  chatContext: number;
  prompt: number;
  personality: number;
  style: number;
  media: number;
  tokenizer: number;
  global: number;
}

export interface HistoriaPub {
  spectator: Profile | undefined;
  profileId: string;
  pubId: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  comment: string;
  npc: string;
  model: string;
  chatContext: string;
  prompt: string;
  style: string;
  personality: string;
  tokenizer: string;
  media: string;
  global: string;
}

export type HistoriaPubProps = {
  historia: HistoriaPub[];
  dict: Dictionary;
  votosCargando: boolean;
};
