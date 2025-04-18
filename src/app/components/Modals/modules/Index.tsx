"use client";

import { IndexProps } from "../types/modals.types";

function Index({ dict, tipo }: IndexProps) {
  return (
    <div className="fixed bottom-5 right-5 w-fit h-fit z-200">
      <div
        className="w-fit h-10 sm:h-16 flex items-center justify-center border border-ligero bg-rosa text-black rounded-md"
      >
        <div className="relative w-fit h-fit flex items-center justify-center px-4 py-2 text-xs sm:text-base font-con">
          {dict.Home?.[tipo as unknown as keyof typeof dict.Home]}
        </div>
      </div>
    </div>
  );
}

export default Index;
