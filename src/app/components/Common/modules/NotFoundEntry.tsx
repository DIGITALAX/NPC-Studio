"use client";

import Link from "next/link";

export default function NotFoundEntry({ dict }: { dict: any }) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center text-2xl font-at text-white break-words">
      <Link
        className="cursor-pointer w-fit h-fit flex items-center justify-center"
        href="/"
      >
        {dict?.[404]?.nada}
      </Link>
    </div>
  );
}
