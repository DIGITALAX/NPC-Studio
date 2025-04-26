import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Activity } from "../../Index/types/index.type";

export type FeedProps = {
  perfil: string;
  router: AppRouterInstance;
  dict: any;
};

export interface NPCVote {
  comment: string;
  model: number;
  chatContext: number;
  personality: number;
  appearance: number;
  scene: number;
  spriteSheet: number;
  tokenizer: number;
  training: number;
  lora: number;
  collections: number;
  global: number;
}

export type ActivityProps = {
  dict: any;
  activity: Activity[];
};
