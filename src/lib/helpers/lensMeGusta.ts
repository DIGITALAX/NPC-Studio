import { Indexar } from "@/components/common/types/common.types";
import { PublicationReactionType } from "../../../graphql/generated";
import likePost from "../../../graphql/lens/mutations/like";
import { SetStateAction } from "react";
import handleIndexCheck from "../../../graphql/lens/queries/indexed";

const lensMeGusta = async (
  id: string,
  downvote: boolean,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void
): Promise<void> => {
  const data = await likePost({
    for: id,
    reaction: downvote
      ? PublicationReactionType.Downvote
      : PublicationReactionType.Upvote,
  });

  if (
    data?.data?.addReaction?.__typename === "RelaySuccess" ||
    !data?.data?.addReaction
  ) {
    if (data?.data?.addReaction?.txId) {
      await handleIndexCheck(
        {
          forTxId: data?.data?.addReaction?.txId,
        },
     setIndexar,
     setErrorInteraccion
      );
    } else {
        setIndexar(Indexar.Exito);
      setTimeout(() => {
        setIndexar(Indexar.Inactivo);
      }, 3000);
    }
  }
};

export default lensMeGusta;
