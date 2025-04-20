import { useContext, useRef, useState } from "react";
import { ModalContext } from "@/app/providers";
import { Account, blockchainData } from "@lens-protocol/client";
import {
  ACCEPTED_TOKENS,
  AUTOGRAPH_ACTION,
  autographTypeToNumber,
} from "@/app/lib/constants";
import { post as createPost } from "@lens-protocol/client/actions";
import { Indexar } from "../../Common/types/common.types";
import pollResult from "@/app/lib/helpers/pollResult";
import { immutable } from "@lens-chain/storage-client";
import { chains } from "@lens-chain/sdk/viem";
import { image, MediaImageMimeType } from "@lens-protocol/metadata";
import { ethers } from "ethers";

const useConnectPub = (dict: any) => {
  const contexto = useContext(ModalContext);
  const coder = new ethers.AbiCoder();
  const [cargandoConexion, setCargandoConexion] = useState<boolean>(false);
  const [caretCoord, setCaretCoord] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);
  const [perfilesAbiertos, setPerfilesAbiertos] = useState<boolean[]>([]);
  const [mencionarPerfiles, setMencionarPerfiles] = useState<Account[]>([]);
  const elementoTexto = useRef<HTMLTextAreaElement | null>(null);
  const [descripcion, setDescripcion] = useState<string>("");

  const hacerPublicacion = async (): Promise<void> => {
    setCargandoConexion(true);

    try {
      const acl = immutable(chains.mainnet.id);
      const schema = image({
        content: descripcion!,
        tags: ["npcStudio"]?.filter(Boolean) as string[],
        image: {
          item: contexto?.coleccionActual?.imagenes?.[0]!,
          type: MediaImageMimeType.PNG,
        },
      });
      const { uri } = await contexto?.clienteAlmacenamiento?.uploadAsJson(
        schema,
        { acl }
      )!;

      const data = coder.encode(
        [
          "tuple(address[] acceptedTokens, string[] pages, string uri, uint256 collectionId, uint256 price, uint256 amount, uint8 pageCount, uint8 autographType)",
        ],
        [
          {
            acceptedTokens: [],
            pages: [],
            uri: "",
            collectionId: contexto?.coleccionActual.coleccionId,
            price: 0,
            amount: 0,
            pageCount: 0,
            autographType:
              autographTypeToNumber[contexto?.coleccionActual.tipo || 0],
          },
        ]
      );

      // const data = coder.encode(
      //   [
      //     "tuple(address[] acceptedTokens, string[] pages, string uri, uint256 collectionId, uint256 price, uint256 amount, uint8 pageCount, uint8 autographType)",
      //   ],
      //   [
      //     {
      //       acceptedTokens: ACCEPTED_TOKENS.flatMap((tok) => tok[2]),
      //       pages: [
      //         "ipfs://QmcEhvhEkXTHTxJwy1VU6rzpaMLq97E7qAmxZjJyzgnX9J",
      //         "ipfs://QmVPCvDekjz6KCb3g5iz5oLVaCNbgygfkHYUNWKc2Srp1v",
      //         "ipfs://QmbEixijFkTqn1G6ASQVptB7B7zw74MAYKqrPhPB6aUjtX",
      //         "ipfs://QmSxAebuEPqHF61B2k3yoT6ewBQHPoE3iSRbLgvGosQ3Co",
      //         "ipfs://QmcKeBonczcNmWfV9ygefdzsvkQoKUnH7X4TLubC4t9kSq",
      //         "ipfs://QmdTcAbF1JMc53qokv7wWWAT1GuWcDHcNX8cdxKLALig7x",
      //         "ipfs://QmeTyR591ytYczYWZH1DCYL89Y7vXpouAHi5PcaS1dWNWS",
      //         "ipfs://QmYDLEepm39rwSdbw6eVemkGWAuDwPtee2SFUVGeTjVeeL",
      //         "ipfs://QmXNNx7YW3u4hUyjJv37arfiCsyws5GhvtqsXj3CtXFVoZ",
      //         "ipfs://QmSobLsibKD8jNh5gfWWBFVXHQLmS3voMRQ56CFLptMtD1",
      //         "ipfs://Qmb5GSPUUAcBqb37zoPJNXGPd1Yqjh9h3iFtKwYhztkWgj",
      //         "ipfs://QmQ8vZvky9aNCaZUKb9FQqCu6cy9ECD2YWCEGPdexUDRNR",
      //         "ipfs://QmZ4cDjbGsnpDY6U7aLeR86oUJ8JrKQhkF4HH6BokQimtK",
      //         "ipfs://Qmb4a1pmBG28TpU9Urmm5Yu3BdD6YhiyTjc1emFkLFkSnE",
      //         "ipfs://QmUgL359MV23DjhzXN5Uf2KULcMnHnrDcRJoSGj31BKpmn",
      //         "ipfs://QmQxZnFB7AqYw877WBaReevpomZ8qHi5fDkfHACga35bTE",
      //         "ipfs://QmaPQgBQ3FbEb96JVZY3yepqewsRD4UVwgHs6Xse2mWW5T",
      //         "ipfs://QmPLcYtBuYDkFmNPr694NYMXLaxWu4aMFRu2AiGDB6RUbh",
      //         "ipfs://QmQqv5cz3ocw9duyKT2xF9S6U4SVs1nsAtLdqTRYP2jpBL",
      //         "ipfs://QmXHnZuzNB1fQBfXNfLrZJ1aA4xoXEMRg9Y9m8zR3bsEbq",
      //         "ipfs://QmQzhhB3sZWT2nLBDy31LR5ygeGNEGoVzFv8SpDeiq65qt",
      //         "ipfs://QmSSkhn4Xxy3TZSd2vb7R3Ln8tmD27UJ4YaRfhnWAWvMyc",
      //         "ipfs://QmQNXLswZvFWpVR37M4nN6KQpZsnKAktQENkvKGSk1Lz1v",
      //         "ipfs://QmdhZrqE2uhcfd27P2Cm1M43QgnPkCZ5NXntx9jg6gbcha",
      //         "ipfs://QmcAzznYC3zfDefSo65i6oHeHXv3cmZRE8wb3GpDUVqH6f",
      //         "ipfs://QmfXp9dEw9p4twT7SdKB2vbMHVTFSE6LCnZH1RNVjPfh65",
      //         "ipfs://QmZWkYaLBwBRGcesoiU6cnvHt1vZDXEiCUgD1nsWByeqRf",
      //         "ipfs://QmPrGeK6Sdz6wzq5yCcqnKT43o9rvQgvyNFmBjmeDioH7Y",
      //         "ipfs://QmQaJL1Vqtiu1kKHuHFzj4rKJHHZnMzaZefKvNYBatZQ1F",
      //         "ipfs://QmZ4WrFGCVsSscU6HHBXh8zuFpr5Hz9xEQDPrAB84PZs6x",
      //         "ipfs://QmQJgjazkjDUtjZLo45dy1vfVJkGb6ZLHmDdNKv4jmaJQJ",
      //         "ipfs://QmUx8zhVHjgCZ3CZrsfeDmdvfsCnMPyhFArcTZbirKPzm6",
      //         "ipfs://QmUiTq3inazHovqYKoNdqft6tgEWCLNjB2NHhmfunxidrU",
      //         "ipfs://QmYQwTHJTJZJaypAFPEBo1NGMYGm1VcBJhhXX81FgZBFVn",
      //         "ipfs://QmWidEaFbBmxZRLP8YPwWRZP3qHev9Z4oCdjYy2BxEWjFo",
      //         "ipfs://QmTktAXQLpvoo81bBesopt9XgXDs2T6Mf33WzVuUEWX9Hm",
      //         "ipfs://QmU4L6ZRyxAahZPSnELs6QSrMpXZUjYYibfXHHj3mGgdXA",
      //         "ipfs://QmWiVVKfwTDViJ11zKPTqhxZEXgwMAKX658Rt13oEXttvt",
      //         "ipfs://QmTLSStNZZiYnXpZos4aPwngjxb9ZgFoyvDMCtuNEywPKm",
      //         "ipfs://QmYMdrZectaPb3NW7LkvgW9po2p3dxtZdvXyk6Bfsk2HJ5",
      //         "ipfs://QmZ1HicjkabkBfFaGzvxjSgERdmWGH3YngCcR15KjUHuj6",
      //         "ipfs://Qmd3bHC35gwf29gzXc6iSJgsC72XqSoaKCy8kxBgkHTK72",
      //         "ipfs://QmUjJZpo7PdSCHHePNSsFW8sP9o1xgNBt1uEGSLDFp4e4H",
      //         "ipfs://Qmb2CitPKvJZEv5mFCEznVDGKE4HWX1mb4Utkiok7cHRYa",
      //         "ipfs://QmSwzPtyUtDcr4TSaGdkEKu9MEFjanFiQqwpaKP3yqiMi4",
      //         "ipfs://Qmd7F5eL4tin4CrPnoWk78Z6n33pS1CVQb7YknfsP5qLtg",
      //         "ipfs://QmSiEXcLYXgRBT5wnc6YSLL3HyNNoRHDmL8ZjVZmMzCpXn",
      //         "ipfs://QmbQCjgmyfShMJcW23ZtahEY31KPVwXVmP57qWrccMpdS6",
      //         "ipfs://QmZxJ7nK3yjCadvFp83jo3mYw87H51Ct55VsXm9iBWAczZ",
      //         "ipfs://QmU3FYYpLJ9NEpxLfEQp7wCkTLydV21WjTo5uPfzEK2ArN",
      //         "ipfs://QmbvuyvHpitWypcFftSTm4oVrzgRoy5XgBb18t4HE31MWd",
      //         "ipfs://QmanQANLPGFZuCh2GiBtUuQwLrQNyspzwVTvKajSoh4Fj5",
      //         "ipfs://QmeG1e78bruFdevnSfAcorBH5rmC9HCyL7ZazBvESTkt4E",
      //         "ipfs://QmNtJBaUJXvvfSn4oEPba5x17KTrSK8n6AJ8eGtAdoKBQD",
      //         "ipfs://Qme8jXMJ4YBiy67Zun5FhJree18bHPP1nR6o4a3WRzdSd9",
      //         "ipfs://QmNRWQgeqEwjobvDLWHLvLAEeMLPMZnpiwJwzPvZK3x3De",
      //       ],
      //       uri: "ipfs://QmcVVF9PGwtwmwYSGX47d41bof36Yv9eczuGFGdX1LaHPc",
      //       collectionId: 0,
      //       price: "100000000000000000000",
      //       amount: 300,
      //       pageCount: 56,
      //       autographType: 3,
      //     },
      //   ]
      // );

      const res = await createPost(contexto?.lensConectado?.sessionClient!, {
        contentUri: uri,
        actions: [
          {
            unknown: {
              address: AUTOGRAPH_ACTION,
              params: [
                {
                  raw: {
                    key: ethers.keccak256(
                      ethers.toUtf8Bytes("lens.param.autographCreator")
                    ),
                    data: blockchainData(data),
                  },
                },
              ],
            },
          },
        ],
      });

      if (res.isErr()) {
        console.error(res.error);
        contexto?.setError?.(dict.Home.error);
        setCargandoConexion(false);
        return;
      }

      if ((res.value as any)?.reason?.includes("Signless")) {
        contexto?.setSignless?.(true);
      } else if ((res.value as any)?.hash) {
        contexto?.setIndexar(Indexar.Indexando);
        if (
          await pollResult(
            (res.value as any)?.hash,
            contexto?.lensConectado?.sessionClient!
          )
        ) {
          setDescripcion("");
          contexto?.setConectarPub(false);
          contexto?.setIndexar(Indexar.Exito);
        } else {
          contexto?.setError?.(dict.Home.error1);
        }
      } else {
        contexto?.setError?.(dict.Home.error1);
      }
    } catch (err: any) {
      console.error(err.message);
    }

    setTimeout(() => {
      contexto?.setIndexar(Indexar.Inactivo);
    }, 3000);
    setCargandoConexion(false);
  };

  return {
    cargandoConexion,
    hacerPublicacion,
    caretCoord,
    setCaretCoord,
    perfilesAbiertos,
    setPerfilesAbiertos,
    mencionarPerfiles,
    setMencionarPerfiles,
    elementoTexto,
    descripcion,
    setDescripcion,
  };
};

export default useConnectPub;
