import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { PublicClient, createWalletClient, custom } from "viem";
import { AutographType, Coleccion, Escena, Galeria } from "../types/game.types";
import { polygon } from "viem/chains";
import {
  AUTOGRAPH_COLLECTION,
  AUTOGRAPH_OPEN_ACTION,
  IDIOMAS,
  INFURA_GATEWAY,
  autographTypeToNumber,
  numberToAutograph,
} from "@/lib/constants";
import AutographCollection from "./../../../../abis/AutographCollection.json";
import convertirArchivo from "@/lib/helpers/convertirArchivo";
import { getGalleries } from "../../../../graphql/autograph/queries/getGalleries";
import { Indexar, Notificacion } from "@/components/common/types/common.types";
import { Profile } from "../../../../graphql/generated";
import publicarLens from "@/lib/helpers/publicarLens";
import subirContenido from "@/lib/helpers/subirContenido";
import { ethers } from "ethers";

const useMint = (
  setMint: (e: SetStateAction<number>) => void,
  publicClient: PublicClient,
  address: `0x${string}` | undefined,
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void,
  lensConectado: Profile | undefined,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  escenas: Escena[]
) => {
  const coder = new ethers.AbiCoder();
  const [ahorrarCargando, setAhorrarCargando] = useState<boolean>(false);
  const [mintCargando, setMintCargando] = useState<boolean>(false);
  const [cargandoGalerias, setCargandoGalerias] = useState<boolean>(false);
  const [cargandoBorrar, setCargandoBorrar] = useState<boolean[]>([]);
  const [indiceImagen, setIndiceImagen] = useState<number>(0);
  const [todasLasGalerias, setTodasLasGalerias] = useState<Galeria[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [mostrarGalerias, setMostrarGalerias] = useState<boolean>(false);
  const [conectarPub, setConectarPub] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<{
    npcsAbiertos: boolean;
    idiomasAbiertos: boolean;
    tiposAbiertos: boolean;
    npcsTexto: string;
    idiomasTexto: string;
  }>({
    npcsAbiertos: false,
    idiomasAbiertos: false,
    tiposAbiertos: false,
    npcsTexto: "",
    idiomasTexto: "",
  });
  const [cargandoConexion, setCargandoConexion] = useState<boolean>(false);
  const [coleccionActual, setColeccionActual] = useState<Coleccion>({
    imagen: "",
    cantidad: 1,
    imagenes: Array.from({ length: 3 }, () => ""),
    tokenes: [],
    precio: 0,
    colors: ["black", "white"],
    id: 0,
    tipo: "NFT" as any,
    titulo: "",
    descripcion: "",
    etiquetas: "",
    npcIdiomas: "",
    npcInstrucciones: "",
    npcs: "",
    galeria: "",
    tokenesMinteados: [],
    profileIds: [],
    pubIds: [],
    profile: lensConectado,
  });
  const [caretCoord, setCaretCoord] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);
  const [perfilesAbiertos, setPerfilesAbiertos] = useState<boolean[]>([]);
  const [mencionarPerfiles, setMencionarPerfiles] = useState<Profile[]>([]);
  const elementoTexto = useRef<HTMLTextAreaElement | null>(null);
  const [descripcion, setDescripcion] = useState<string>("");

  const llamarTodasLasGalerias = async () => {
    setCargandoGalerias(true);
    try {
      const datos = await getGalleries(address!);

      const gals = await Promise.all(
        datos?.data?.galleryCreateds.map(async (gal: any) => {
          let colecciones: Coleccion[] = new Array(
            gal.collectionIds.length
          ).fill("");

          await Promise.all(
            gal.collections.map(async (col: any, indice: number) => {
              if (!col.collectionMetadata) {
                const cadena = await fetch(
                  `${INFURA_GATEWAY}/ipfs/${col.uri.split("ipfs://")?.[1]}`
                );
                col.collectionMetadata = await cadena.json();
              }

              colecciones[indice] = {
                galeria: col.collectionMetadata?.gallery,
                imagen: col.collectionMetadata?.image,
                id: col.collectionId,
                cantidad: col.amount,
                tokenes: col.acceptedTokens,
                tokenesMinteados: col.mintedTokens,
                coleccionId: Number(col.collectionId),
                galeriaId: gal.galleryId,
                precio: col.price,
                tipo: numberToAutograph[Number(col.type)] as AutographType,
                titulo: col.collectionMetadata?.title,
                descripcion: col.collectionMetadata?.description,
                etiquetas: col.collectionMetadata?.tags,
                npcIdiomas: col.collectionMetadata?.locales,
                npcInstrucciones: col.collectionMetadata?.instructions,
                npcs: col.collectionMetadata?.npcs,
                profile: undefined,
                imagenes: col.collectionMetadata?.images,
                profileIds: [],
                pubIds: [],
                colors: col.collectionMetadata?.colors,
              };
            })
          );

          return {
            galleryId: gal.galleryId,
            collectionIds: gal.collectionIds,
            colecciones,
          };
        })
      );

      setTodasLasGalerias(gals);
      setCargandoBorrar(
        Array.from({ length: todasLasGalerias.length }, () => false)
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoGalerias(false);
  };

  const manejarMintear = async () => {
    try {
      if (
        colecciones?.filter((el) => el.titulo.trim() == "").length > 0 ||
        colecciones?.filter((el) => el.descripcion.trim() == "").length > 0 ||
        colecciones?.filter((el) => el.imagen.trim() == "").length > 0 ||
        colecciones?.filter((el) => el.tokenes.length < 1).length > 0 ||
        colecciones?.filter((el) => el.precio < 1).length > 0 ||
        colecciones?.filter((el) => el.tipo.toString().trim() == "").length >
          0 ||
        colecciones?.filter((el) => el.galeria?.trim() == "").length > 0
      ) {
        setMostrarNotificacion(Notificacion.Campos);
        return;
      }

      setMintCargando(true);

      const uris = new Array(colecciones.length).fill("");

      await Promise.all(
        (colecciones.filter((col) => col.galeriaId).length > 0
          ? colecciones.filter((col) => !col.galeriaId)
          : colecciones
        ).map(async (col: Coleccion, indice: number) => {
          let image = col.imagen;
          if (!image.includes("ipfs://") && image.trim() !== "") {
            const imagen = await fetch(`/api/ipfs`, {
              method: "POST",
              body: convertirArchivo(col.imagen, "image/png"),
            });
            const res = await imagen.json();
            image = "ipfs://" + res?.cid;
          }
          let images: string[] = [];

          if (col.imagenes?.filter((c) => c.trim() !== "")?.length > 0) {
            await Promise.all(
              col.imagenes?.map(async (im) => {
                if (!im.includes("ipfs://") && im.trim() !== "") {
                  const imagen = await fetch(`/api/ipfs`, {
                    method: "POST",
                    body: convertirArchivo(im, "image/png"),
                  });
                  const res = await imagen.json();

                  images.push("ipfs://" + res?.cid);
                } else if (im.trim() !== "") {
                  images.push(im);
                }
              })
            );
          }

          const response = await fetch("/api/ipfs", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              title: col.titulo,
              description: col.descripcion,
              tags: col.etiquetas,
              npcs: col.npcs,
              image,
              images,
              tipo: col.tipo,
              locales: col.npcIdiomas,
              instructions: col.npcInstrucciones,
              gallery: col.galeria,
            }),
          });

          let responseJSON = await response.json();
          uris[indice] = "ipfs://" + responseJSON?.cid;
        })
      );

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      if (colecciones.filter((col) => col.galeriaId).length > 0) {
        const { request } = await publicClient.simulateContract({
          address: AUTOGRAPH_COLLECTION,
          abi: AutographCollection,
          functionName: "addCollections",
          chain: polygon,
          args: [
            {
              languages: colecciones
                .filter((col) => !col.galeriaId)
                .map(
                  (col) => col.npcIdiomas?.split(",").filter(Boolean) || [""]
                )
                ?.map((id) =>
                  id.map(
                    (n) =>
                      IDIOMAS?.flatMap((s) => ({
                        key: s.key,
                        title: s.title,
                      })).find((s) => s.key == n)?.title
                  )
                ),
              npcs: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => col.npcs?.split(",").filter(Boolean) || [""])
                ?.map((npc) =>
                  npc.map(
                    (n) =>
                      escenas
                        ?.flatMap((s) => s.sprites)
                        .find((s) => s.etiqueta == n)?.billetera
                  )
                ),
              uris,
              amounts: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => col.cantidad),
              prices: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => col.precio * 10 ** 18),
              acceptedTokens: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => col.tokenes),
              collectionTypes: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => autographTypeToNumber[col.tipo]),
            },
            colecciones.map((col) => col.galeriaId)[0],
          ],
          account: address,
        });

        const res = await clientWallet.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: res });

        setMostrarNotificacion(Notificacion.Añadido);
      } else {
        const { request } = await publicClient.simulateContract({
          address: AUTOGRAPH_COLLECTION,
          abi: AutographCollection,
          functionName: "createGallery",
          chain: polygon,
          args: [
            {
              languages: colecciones
                .map(
                  (col) => col.npcIdiomas?.split(",").filter(Boolean) || [""]
                )
                ?.map((id) =>
                  id.map(
                    (n) =>
                      IDIOMAS?.flatMap((s) => ({
                        key: s.key,
                        title: s.title,
                      })).find((s) => s.key == n)?.title
                  )
                ),
              npcs: colecciones
                .map((col) => col.npcs?.split(",").filter(Boolean) || [""])
                ?.map((npc) =>
                  npc.map(
                    (n) =>
                      escenas
                        ?.flatMap((s) => s.sprites)
                        .find((s) => s.etiqueta == n)?.billetera
                  )
                ),
              uris,
              amounts: colecciones.map((col) => col.cantidad),
              prices: colecciones.map((col) => col.precio * 10 ** 18),
              acceptedTokens: colecciones.map((col) => col.tokenes),
              collectionTypes: colecciones.map(
                (col) => autographTypeToNumber[col.tipo]
              ),
            },
          ],
          account: address,
        });

        const res = await clientWallet.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: res });

        setMostrarNotificacion(Notificacion.Creado);
      }

      setColeccionActual({
        imagen: "",
        cantidad: 1,
        tokenes: [],
        precio: 0,
        tipo: "NFT" as any,
        titulo: "",
        descripcion: "",
        etiquetas: "",
        npcIdiomas: "",
        npcInstrucciones: "",
        npcs: "",
        galeria: "",
        id: colecciones?.length,
        colors: ["black", "white"],
        tokenesMinteados: [],
        profile: lensConectado,
        profileIds: [],
        pubIds: [],
        imagenes: Array.from({ length: 3 }, () => ""),
      });
      setDropDown({
        npcsAbiertos: false,
        idiomasAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
        idiomasTexto: "",
      });
      const numChunks = localStorage.getItem("coleccionesGaleria_chunks");
      if (numChunks) {
        for (let i = 0; i < Number(numChunks); i++) {
          localStorage.removeItem(`coleccionesGaleria_${i}`);
        }
        localStorage.removeItem("oleccionesGaleria_chunks");
      }

      setColecciones([]);

      setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const borrarColeccion = async () => {
    setCargandoBorrar([true]);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_COLLECTION,
        abi: AutographCollection,
        functionName: "deleteCollection",
        chain: polygon,
        args: [coleccionActual.coleccionId, coleccionActual.galeriaId],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      setMostrarNotificacion(Notificacion.ColeccionEliminada);

      setColecciones((prev) =>
        prev.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(coleccionActual)
        )
      );
      setColeccionActual({
        imagen: "",
        imagenes: Array.from({ length: 3 }, () => ""),
        cantidad: 1,
        tokenes: [],
        precio: 0,
        id: colecciones?.length,
        colors: ["black", "white"],
        tipo: "NFT" as any,
        titulo: "",
        descripcion: "",
        etiquetas: "",
        npcIdiomas: "",
        npcInstrucciones: "",
        npcs: "",
        galeria: "",
        tokenesMinteados: [],
        profileIds: [],
        pubIds: [],
        profile: lensConectado,
      });
      setDropDown({
        npcsAbiertos: false,
        idiomasAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
        idiomasTexto: "",
      });
      setIndiceImagen(0);
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoBorrar([false]);
  };

  const borrarGaleria = async (galeriaId: number, indice: number) => {
    setCargandoBorrar((prev) => {
      const arr = [...prev];
      arr[indice] = true;
      return arr;
    });
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_COLLECTION,
        abi: AutographCollection,
        functionName: "deleteGallery",
        chain: polygon,
        args: [galeriaId],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });

      setMostrarNotificacion(Notificacion.GaleriaEliminada);
      setTodasLasGalerias((prev) =>
        prev.filter((item) => Number(item.galleryId) !== galeriaId)
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoBorrar((prev) => {
      const arr = [...prev];
      arr[indice] = false;
      return arr;
    });
  };

  const manejarArchivo = (
    e: ChangeEvent<HTMLInputElement>,
    indice?: number
  ): void => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        let objeto: Object = {};
        if (indice || indice == 0) {
          let imagenes: string[] = coleccionActual.imagenes;

          imagenes[indice] = e.target?.result as string;

          objeto = {
            imagenes,
          };
        } else {
          objeto = {
            imagen: e.target?.result as string,
          };
        }
        setColeccionActual((prev) => ({
          ...prev,
          ...objeto,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const manejarAhorrar = async () => {
    setAhorrarCargando(true);

    const num = localStorage.getItem("coleccionesGaleria_chunks");
    if (num) {
      for (let i = 0; i < Number(num); i++) {
        localStorage.removeItem(`coleccionesGaleria_${i}`);
      }
      localStorage.removeItem("oleccionesGaleria_chunks");
    }

    let newColecciones: Coleccion[] = new Array(colecciones.length).fill("");

    await Promise.all(
      colecciones?.map(async (col, indice) => {
        let imagen = col.imagen;

        if (!imagen.includes("ipfs://")) {
          const resI = await fetch(`/api/ipfs`, {
            method: "POST",
            body: convertirArchivo(col.imagen, "image/png"),
          });
          const res = await resI.json();
          imagen = "ipfs://" + res?.cid;
        }

        newColecciones[indice] = {
          ...col,
          imagen,
        };
      })
    );

    const dataString = JSON.stringify(newColecciones);
    const chunkSize = 1000;
    const numChunks = Math.ceil(dataString.length / chunkSize);

    for (let i = 0; i < numChunks; i++) {
      const chunk = dataString.slice(i * chunkSize, (i + 1) * chunkSize);
      localStorage.setItem(`coleccionesGaleria_${i}`, chunk);
    }
    localStorage.setItem("coleccionesGaleria_chunks", String(numChunks));

    setAhorrarCargando(false);
  };

  const hacerPublicacion = async (): Promise<void> => {
    setCargandoConexion(true);

    try {
      const contentURI = await subirContenido(
        descripcion,
        [
          {
            medios: coleccionActual?.imagen,
            tipo: "image/png",
          },
        ],
        [],
        []
      );

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await publicarLens(
        contentURI!,
        [
          {
            unknownOpenAction: {
              address: AUTOGRAPH_OPEN_ACTION,
              data: coder.encode(
                [
                  "tuple(string[] pages, address[] acceptedTokens, string uri,uint8 autographType, uint256 collectionId, uint256 price, uint16 galleryId, uint16 amount, uint8 pageCount)",
                ],
                [
                  {
                    autographType: autographTypeToNumber[coleccionActual.tipo],
                    price: 0,
                    acceptedTokens: [],
                    uri: "",
                    amount: 0,
                    pages: [],
                    pageCount: 0,
                    collectionId: coleccionActual.coleccionId,
                    galleryId: coleccionActual.galeriaId,
                  },
                ]
              ),
            },
          },
        ],
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion,
        () => setCargandoConexion(false),
        undefined,
        true
      );

      // await publicarLens(
      //   contentURI!,
      //   [
      //     {
      //       unknownOpenAction: {
      //         address: AUTOGRAPH_OPEN_ACTION,
      //         data: coder.encode(
      //           [
      //             "tuple(string[] pages, address[] acceptedTokens, string uri,uint8 autographType, uint256 collectionId, uint256 price, uint16 galleryId, uint16 amount, uint8 pageCount)",
      //           ],
      //           [
      //             {
      //               autographType: 3,
      //               price: "100000000000000000000",
      //               acceptedTokens: [
      //                 "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      //                 "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      //                 "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      //                 "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
      //                 "0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
      //               ],
      //               uri: "ipfs://QmcVVF9PGwtwmwYSGX47d41bof36Yv9eczuGFGdX1LaHPc",
      //               amount: 300,
      //               pages: [
      //                 "ipfs://QmcEhvhEkXTHTxJwy1VU6rzpaMLq97E7qAmxZjJyzgnX9J",
      //                 "ipfs://QmVPCvDekjz6KCb3g5iz5oLVaCNbgygfkHYUNWKc2Srp1v",
      //                 "ipfs://QmbEixijFkTqn1G6ASQVptB7B7zw74MAYKqrPhPB6aUjtX",
      //                 "ipfs://QmSxAebuEPqHF61B2k3yoT6ewBQHPoE3iSRbLgvGosQ3Co",
      //                 "ipfs://QmcKeBonczcNmWfV9ygefdzsvkQoKUnH7X4TLubC4t9kSq",
      //                 "ipfs://QmdTcAbF1JMc53qokv7wWWAT1GuWcDHcNX8cdxKLALig7x",
      //                 "ipfs://QmeTyR591ytYczYWZH1DCYL89Y7vXpouAHi5PcaS1dWNWS",
      //                 "ipfs://QmYDLEepm39rwSdbw6eVemkGWAuDwPtee2SFUVGeTjVeeL",
      //                 "ipfs://QmXNNx7YW3u4hUyjJv37arfiCsyws5GhvtqsXj3CtXFVoZ",
      //                 "ipfs://QmSobLsibKD8jNh5gfWWBFVXHQLmS3voMRQ56CFLptMtD1",
      //                 "ipfs://Qmb5GSPUUAcBqb37zoPJNXGPd1Yqjh9h3iFtKwYhztkWgj",
      //                 "ipfs://QmQ8vZvky9aNCaZUKb9FQqCu6cy9ECD2YWCEGPdexUDRNR",
      //                 "ipfs://QmZ4cDjbGsnpDY6U7aLeR86oUJ8JrKQhkF4HH6BokQimtK",
      //                 "ipfs://Qmb4a1pmBG28TpU9Urmm5Yu3BdD6YhiyTjc1emFkLFkSnE",
      //                 "ipfs://QmUgL359MV23DjhzXN5Uf2KULcMnHnrDcRJoSGj31BKpmn",
      //                 "ipfs://QmQxZnFB7AqYw877WBaReevpomZ8qHi5fDkfHACga35bTE",
      //                 "ipfs://QmaPQgBQ3FbEb96JVZY3yepqewsRD4UVwgHs6Xse2mWW5T",
      //                 "ipfs://QmPLcYtBuYDkFmNPr694NYMXLaxWu4aMFRu2AiGDB6RUbh",
      //                 "ipfs://QmQqv5cz3ocw9duyKT2xF9S6U4SVs1nsAtLdqTRYP2jpBL",
      //                 "ipfs://QmXHnZuzNB1fQBfXNfLrZJ1aA4xoXEMRg9Y9m8zR3bsEbq",
      //                 "ipfs://QmQzhhB3sZWT2nLBDy31LR5ygeGNEGoVzFv8SpDeiq65qt",
      //                 "ipfs://QmSSkhn4Xxy3TZSd2vb7R3Ln8tmD27UJ4YaRfhnWAWvMyc",
      //                 "ipfs://QmQNXLswZvFWpVR37M4nN6KQpZsnKAktQENkvKGSk1Lz1v",
      //                 "ipfs://QmdhZrqE2uhcfd27P2Cm1M43QgnPkCZ5NXntx9jg6gbcha",
      //                 "ipfs://QmcAzznYC3zfDefSo65i6oHeHXv3cmZRE8wb3GpDUVqH6f",
      //                 "ipfs://QmfXp9dEw9p4twT7SdKB2vbMHVTFSE6LCnZH1RNVjPfh65",
      //                 "ipfs://QmZWkYaLBwBRGcesoiU6cnvHt1vZDXEiCUgD1nsWByeqRf",
      //                 "ipfs://QmPrGeK6Sdz6wzq5yCcqnKT43o9rvQgvyNFmBjmeDioH7Y",
      //                 "ipfs://QmQaJL1Vqtiu1kKHuHFzj4rKJHHZnMzaZefKvNYBatZQ1F",
      //                 "ipfs://QmZ4WrFGCVsSscU6HHBXh8zuFpr5Hz9xEQDPrAB84PZs6x",
      //                 "ipfs://QmQJgjazkjDUtjZLo45dy1vfVJkGb6ZLHmDdNKv4jmaJQJ",
      //                 "ipfs://QmUx8zhVHjgCZ3CZrsfeDmdvfsCnMPyhFArcTZbirKPzm6",
      //                 "ipfs://QmUiTq3inazHovqYKoNdqft6tgEWCLNjB2NHhmfunxidrU",
      //                 "ipfs://QmYQwTHJTJZJaypAFPEBo1NGMYGm1VcBJhhXX81FgZBFVn",
      //                 "ipfs://QmWidEaFbBmxZRLP8YPwWRZP3qHev9Z4oCdjYy2BxEWjFo",
      //                 "ipfs://QmTktAXQLpvoo81bBesopt9XgXDs2T6Mf33WzVuUEWX9Hm",
      //                 "ipfs://QmU4L6ZRyxAahZPSnELs6QSrMpXZUjYYibfXHHj3mGgdXA",
      //                 "ipfs://QmWiVVKfwTDViJ11zKPTqhxZEXgwMAKX658Rt13oEXttvt",
      //                 "ipfs://QmTLSStNZZiYnXpZos4aPwngjxb9ZgFoyvDMCtuNEywPKm",
      //                 "ipfs://QmYMdrZectaPb3NW7LkvgW9po2p3dxtZdvXyk6Bfsk2HJ5",
      //                 "ipfs://QmZ1HicjkabkBfFaGzvxjSgERdmWGH3YngCcR15KjUHuj6",
      //                 "ipfs://Qmd3bHC35gwf29gzXc6iSJgsC72XqSoaKCy8kxBgkHTK72",
      //                 "ipfs://QmUjJZpo7PdSCHHePNSsFW8sP9o1xgNBt1uEGSLDFp4e4H",
      //                 "ipfs://Qmb2CitPKvJZEv5mFCEznVDGKE4HWX1mb4Utkiok7cHRYa",
      //                 "ipfs://QmSwzPtyUtDcr4TSaGdkEKu9MEFjanFiQqwpaKP3yqiMi4",
      //                 "ipfs://Qmd7F5eL4tin4CrPnoWk78Z6n33pS1CVQb7YknfsP5qLtg",
      //                 "ipfs://QmSiEXcLYXgRBT5wnc6YSLL3HyNNoRHDmL8ZjVZmMzCpXn",
      //                 "ipfs://QmbQCjgmyfShMJcW23ZtahEY31KPVwXVmP57qWrccMpdS6",
      //                 "ipfs://QmZxJ7nK3yjCadvFp83jo3mYw87H51Ct55VsXm9iBWAczZ",
      //                 "ipfs://QmU3FYYpLJ9NEpxLfEQp7wCkTLydV21WjTo5uPfzEK2ArN",
      //                 "ipfs://QmbvuyvHpitWypcFftSTm4oVrzgRoy5XgBb18t4HE31MWd",
      //                 "ipfs://QmanQANLPGFZuCh2GiBtUuQwLrQNyspzwVTvKajSoh4Fj5",
      //                 "ipfs://QmeG1e78bruFdevnSfAcorBH5rmC9HCyL7ZazBvESTkt4E",
      //                 "ipfs://QmNtJBaUJXvvfSn4oEPba5x17KTrSK8n6AJ8eGtAdoKBQD",
      //                 "ipfs://Qme8jXMJ4YBiy67Zun5FhJree18bHPP1nR6o4a3WRzdSd9",
      //                 "ipfs://QmNRWQgeqEwjobvDLWHLvLAEeMLPMZnpiwJwzPvZK3x3De",
      //               ],
      //               pageCount: 56,
      //               collectionId: 0,
      //               galleryId: 0,
      //             },
      //           ]
      //         ),
      //       },
      //     },
      //   ],
      //   address as `0x${string}`,
      //   clientWallet,
      //   publicClient,
      //   setIndexar,
      //   setErrorInteraccion,
      //   () => setCargandoConexion(false),
      //   undefined,
      //   true
      // );

      setDescripcion("");
      setConectarPub(false);
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoConexion(false);
  };

  useEffect(() => {
    if (colecciones?.length < 1) {
      const numChunks = localStorage.getItem("coleccionesGaleria_chunks");
      if (numChunks) {
        let dataString = "";
        for (let i = 0; i < Number(numChunks); i++) {
          const chunk = localStorage.getItem(`coleccionesGaleria_${i}`);
          if (chunk) {
            dataString += chunk;
          }
        }

        if (dataString !== "") {
          const coleccionesGuardadas = JSON.parse(dataString);
          if (coleccionesGuardadas) {
            setColecciones(coleccionesGuardadas);
            setColeccionActual({
              imagen: "",
              cantidad: 1,
              tokenes: [],
              precio: 0,
              id: coleccionesGuardadas.length,
              tipo: "NFT" as any,
              titulo: "",
              descripcion: "",
              colors: ["black", "white"],
              etiquetas: "",
              npcIdiomas: "",
              npcInstrucciones: "",
              npcs: "",
              galeria: coleccionesGuardadas?.[0]?.galeria,
              tokenesMinteados: [],
              profileIds: [],
              pubIds: [],
              profile: lensConectado,
              imagenes: Array.from({ length: 3 }, () => ""),
            });
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (mostrarGalerias && address) {
      llamarTodasLasGalerias();
    }
  }, [mostrarGalerias, address]);

  return {
    manejarMintear,
    mintCargando,
    manejarArchivo,
    colecciones,
    setColecciones,
    coleccionActual,
    setColeccionActual,
    manejarAhorrar,
    dropDown,
    setDropDown,
    mostrarGalerias,
    setMostrarGalerias,
    cargandoGalerias,
    todasLasGalerias,
    borrarColeccion,
    borrarGaleria,
    cargandoBorrar,
    ahorrarCargando,
    cargandoConexion,
    conectarPub,
    hacerPublicacion,
    setConectarPub,
    caretCoord,
    setCaretCoord,
    perfilesAbiertos,
    setPerfilesAbiertos,
    mencionarPerfiles,
    setMencionarPerfiles,
    elementoTexto,
    descripcion,
    setDescripcion,
    indiceImagen,
    setIndiceImagen,
  };
};

export default useMint;
