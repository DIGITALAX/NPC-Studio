"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useCargando() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navegando, setNavegando] = useState(false);

  useEffect(() => {
    const url = pathname + searchParams.toString();

    setNavegando(true);

    const timer = setTimeout(() => {
      setNavegando(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return navegando;
}
