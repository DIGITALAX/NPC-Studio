import { useEffect, useRef } from "react";
import { PageFlip } from "page-flip";
import { Catalogo } from "../types/common.types";

const usePagina = (catalogo: Catalogo) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  useEffect(() => {
    if (
      bookRef.current &&
      !pageFlipRef.current &&
      catalogo?.paginas?.length > 0
    ) {
      const padre = document.getElementById("padre");
      if (padre) {
        pageFlipRef.current = new PageFlip(bookRef.current, {
          width: 453,
          height: 320,
          maxShadowOpacity: 0.5,
          showCover: true,
          mobileScrollSupport: true,
          showPageCorners: true,
          autoSize: true,
        });

        pageFlipRef.current.loadFromHTML(document.querySelectorAll(".page"));
      }
    }

    return () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    };
  }, []);

  return {
    bookRef,
  };
};

export default usePagina;
