"use client";
import { useContext, useEffect } from "react";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import { AnimationContext } from "@/app/providers";

export default function Animation({ children }: { children: React.ReactNode }) {
  const context = useContext(AnimationContext);

  useEffect(() => {
    if (context?.pageChange) {
      window.scrollTo({ top: 0, behavior: "instant" });
      window.document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        context?.setPageChange(false);
        window.document.body.style.overflow = "auto";
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [context?.pageChange]);

  return (
    <>
      {context?.pageChange ? (
        <div
          className="fixed top-0 left-0 w-full h-full min-h-screen flex items-center justify-center bg-black z-300"
          id="juego"
        >
          <div className="relative flex justify-center items-center flex-col gap-4">
            <div className="w-20 h-20 relative flex items-center justify-center animate-pulse">
              <Image
                width={298}
                height={226}
                priority
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/QmXMzhCBRuwFY6tbvTpNvPVageuK63eNzJ2KWkMGNrUCrw`}
              />
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
