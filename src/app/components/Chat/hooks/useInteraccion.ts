import { Post } from "@lens-protocol/client";
import { useContext, useEffect, useState } from "react";
import { addReaction, repost } from "@lens-protocol/client/actions";
import { ModalContext } from "@/app/providers";
import { Indexar } from "../../Common/types/common.types";

const useInteraccion = (dict: any, post: Post) => {
  const contexto = useContext(ModalContext);
  const [openMirror, setOpenMirror] = useState<boolean>(false);
  const [interactionLoading, setInteractionLoading] = useState<{
    mirror: boolean;
    like: boolean;
    comment: boolean;
    collect: boolean;
  }>({
    mirror: false,
    like: false,
    comment: false,
    collect: false,
  });
  const [interactions, setInteractions] = useState<{
    upvotes: number;
    hasUpvoted: boolean;
    reposts: number;
    quotes: number;
    collects: number;
    hasQuoted: boolean;
    hasSimpleCollected: boolean;
    hasReposted: boolean;
    hasCommented: boolean;
    comments: number;
  }>({
    upvotes: 0,
    hasUpvoted: false,
    hasSimpleCollected: false,
    hasQuoted: false,
    collects: 0,
    quotes: 0,
    reposts: 0,
    hasReposted: false,
    hasCommented: false,
    comments: 0,
  });

  const handleLike = async (id: string, reaction: string) => {
    setInteractionLoading({
      ...interactionLoading,
      like: true,
    });
    try {
      const res = await addReaction(contexto?.lensConectado?.sessionClient!, {
        post: id,
        reaction,
      });
      if (res.isOk()) {
        if ((res.value as any)?.reason?.includes("Signless")) {
          contexto?.setSignless?.(true);
        } else if ((res.value as any)?.success) {
          setInteractions?.({
            ...interactions,
            upvotes:
              reaction == "DOWNVOTE"
                ? Number(post?.stats?.upvotes) - 1
                : Number(post?.stats?.upvotes) + 1,
            hasUpvoted: reaction ? false : true,
          });
        } else {
          contexto?.setError?.(dict.Home.error);
        }
      } else {
        contexto?.setError?.(dict.Home.error);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setInteractionLoading({
      ...interactionLoading,
      like: false,
    });
  };

  const handleMirror = async (id: string) => {
    setInteractionLoading({
      ...interactionLoading,
      mirror: true,
    });
    try {
      const res = await repost(contexto?.lensConectado?.sessionClient!, {
        post: id,
      });
      contexto?.setIndexar(Indexar.Indexando);
      if (res.isErr()) {
        contexto?.setError?.(dict.Home.error);
        setInteractionLoading({
          ...interactionLoading,
          mirror: false,
        });

        return;
      }

      if ((res.value as any)?.reason?.includes("Signless")) {
        contexto?.setSignless?.(true);
      } else if ((res.value as any)?.hash) {
        setInteractions?.({
          ...interactions,
          reposts: Number(post?.stats?.reposts) + 1,
          hasUpvoted: true,
        });
        contexto?.setIndexar(Indexar.Exito);
      } else {
        contexto?.setError?.(dict.Home.error);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setTimeout(() => {
      contexto?.setIndexar(Indexar.Inactivo);
    }, 3000);
    setInteractionLoading({
      ...interactionLoading,
      mirror: false,
    });
  };

  useEffect(() => {
    if (post) {
      setInteractions({
        hasReposted: post?.operations?.hasReposted?.optimistic!,
        upvotes: post?.stats?.upvotes,
        hasUpvoted: post?.operations?.hasUpvoted!,
        reposts: post?.stats?.reposts + post?.stats?.quotes,
        hasCommented: post?.operations?.hasCommented?.optimistic!,
        comments: post?.stats?.comments,
        hasQuoted: post?.operations?.hasQuoted?.optimistic!,
        quotes: post?.stats?.quotes,
        collects: post?.stats?.collects,
        hasSimpleCollected: post?.operations?.hasSimpleCollected!,
      });
    }
  }, [post]);

  return {
    handleMirror,
    handleLike,
    interactions,
    interactionLoading,
    openMirror,
    setOpenMirror,
  };
};

export default useInteraccion;
