import { useEffect, useState } from "react";
import {
  Comment,
  LimitType,
  Profile,
  Quote,
} from "../../../../graphql/generated";
import getPublications from "../../../../graphql/lens/queries/publications";
import whoReactedPublication from "../../../../graphql/lens/queries/whoReacted";
import whoActedPublication from "../../../../graphql/lens/queries/whoActed";
import { Dictionary } from "@/components/game/types/game.types";

const useMostrar = (
  id: string,
  lensConectado: Profile | undefined,
  tipo: string,
  dict: Dictionary
) => {
  const [mirrorQuote, setMirrorQuote] = useState<boolean>(false);
  const [datosCargando, setDatosCargando] = useState<boolean>(false);
  const [tieneMas, setTieneMas] = useState<boolean>(false);
  const [tieneMasCita, setTieneMasCita] = useState<boolean>(false);
  const [reactors, setReactors] = useState<any[]>([]);
  const [paginaInfo, setPaginaInfo] = useState<string>();
  const [paginaInfoCita, setPaginaInfoCita] = useState<string>();
  const [quoters, setQuoters] = useState<(Quote | Comment)[]>([]);

  const showLikes = async () => {
    if (!id) return;
    setDatosCargando(true);
    try {
      const data = await whoReactedPublication(
        {
          for: id,
          limit: LimitType.Ten,
        },
        lensConectado?.id
      );

      setReactors(data?.data?.whoReactedPublication?.items || []);
      setPaginaInfo(data?.data?.whoReactedPublication.pageInfo.next);

      if (
        !data?.data?.whoReactedPublication?.items ||
        data?.data?.whoReactedPublication?.items?.length < 10
      ) {
        setTieneMas(false);
        setDatosCargando(false);
        return;
      } else if (data?.data?.whoReactedPublication?.items?.length === 10) {
        setTieneMas(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDatosCargando(false);
  };

  const showComments = async () => {
    if (!id) return;
    setDatosCargando(true);
    try {
      const data = await getPublications(
        {
          where: {
            commentOn: {
              id,
            },
          },
          limit: LimitType.Ten,
        },
        lensConectado?.id
      );

      setReactors(data?.data?.publications?.items || []);
      setPaginaInfo(data?.data?.publications.pageInfo.next);
      if (
        !data?.data?.publications?.items ||
        data?.data?.publications?.items?.length < 10
      ) {
        setTieneMas(false);
        setDatosCargando(false);
        return;
      } else if (data?.data?.publications?.items?.length === 10) {
        setTieneMas(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDatosCargando(false);
  };

  const showMirrorQuotes = async () => {
    if (!id) return;

    setDatosCargando(true);

    try {
      const mirrorData = await getPublications(
        {
          limit: LimitType.Ten,
          where: {
            mirrorOn: id,
          },
        },
        lensConectado?.id
      );

      setReactors(mirrorData?.data?.publications?.items || []);
      setPaginaInfo(mirrorData?.data?.publications.pageInfo.next);
      if (
        !mirrorData?.data?.publications?.items ||
        mirrorData?.data?.publications?.items?.length < 10
      ) {
        setTieneMas(false);
      } else if (mirrorData?.data?.publications?.items?.length === 10) {
        setTieneMas(true);
      }

      const quoteData = await getPublications(
        {
          limit: LimitType.Ten,
          where: {
            quoteOn: id,
          },
        },
        lensConectado?.id
      );

      setQuoters(
        (quoteData?.data?.publications?.items || []) as (Quote & {
          decrypted: any;
        })[]
      );
      setPaginaInfoCita(quoteData?.data?.publications.pageInfo.next);

      if (
        !quoteData?.data?.publications?.items ||
        quoteData?.data?.publications?.items?.length < 10
      ) {
        setTieneMasCita(false);
        setDatosCargando(false);
      } else if (quoteData?.data?.publications?.items?.length === 10) {
        setTieneMasCita(true);
      }

      if (
        (mirrorData?.data?.publications?.items || [])?.length < 1 &&
        (quoteData?.data?.publications?.items || [])?.length > 0
      ) {
        setMirrorQuote(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDatosCargando(false);
  };

  const showActors = async () => {
    if (!id) return;
    setDatosCargando(true);
    try {
      const data = await whoActedPublication(
        {
          on: id,
          limit: LimitType.Ten,
        },
        lensConectado?.id
      );

      setReactors(data?.data?.whoActedOnPublication?.items || []);
      setPaginaInfo(data?.data?.whoActedOnPublication.pageInfo.next);

      if (
        !data?.data?.whoActedOnPublication?.items ||
        data?.data?.whoActedOnPublication?.items?.length < 10
      ) {
        setTieneMas(false);
        setDatosCargando(false);
      } else if (data?.data?.whoActedOnPublication?.items?.length === 10) {
        setTieneMas(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDatosCargando(false);
  };

  // const showFollowing = async () => {
  //   if (!id) return;
  //   setDatosCargando(true);
  //   try {
  //     const data = await following(
  //       {
  //         for: id,
  //         limit: LimitType.Ten,
  //       },
  //       lensConectado?.id
  //     );

  //     setReactors(data?.data?.following?.items || []);
  //     setPaginaInfo(data?.data?.following.pageInfo.next);

  //     if (
  //       !data?.data?.following?.items ||
  //       data?.data?.following?.items?.length < 10
  //     ) {
  //       setTieneMas(false);
  //       setDatosCargando(false);
  //     } else if (data?.data?.following?.items?.length === 10) {
  //       setTieneMas(true);
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  //   setDatosCargando(false);
  // };

  // const showFollowers = async () => {
  //   if (!id) return;
  //   setDatosCargando(true);
  //   try {
  //     const data = await followers(
  //       {
  //         of: id,
  //         limit: LimitType.Ten,
  //       },
  //       lensConectado?.id
  //     );

  //     setReactors(data?.data?.followers?.items || []);
  //     setPaginaInfo(data?.data?.followers.pageInfo.next);

  //     if (
  //       !data?.data?.followers?.items ||
  //       data?.data?.followers?.items?.length < 10
  //     ) {
  //       setTieneMas(false);
  //       setDatosCargando(false);
  //       return;
  //     } else if (data?.data?.followers?.items?.length === 10) {
  //       setTieneMas(true);
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  //   setDatosCargando(false);
  // };

  const showMoreLikes = async () => {
    if (!paginaInfo || !tieneMas) return;
    try {
      const data = await whoReactedPublication(
        {
          for: id,
          limit: LimitType.Ten,
          cursor: paginaInfo,
        },
        lensConectado?.id
      );

      setReactors([
        ...reactors,
        ...(data?.data?.whoReactedPublication?.items || []),
      ]);
      setPaginaInfo(data?.data?.whoReactedPublication.pageInfo.next);

      if (
        !data?.data?.whoReactedPublication?.items ||
        data?.data?.whoReactedPublication?.items?.length < 10
      ) {
        setTieneMas(false);
        return;
      } else if (data?.data?.whoReactedPublication?.items?.length === 10) {
        setTieneMas(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const showMoreComments = async () => {
    if (!paginaInfo || !tieneMas) return;
    try {
      const data = await getPublications(
        {
          where: {
            commentOn: {
              id,
            },
          },
          limit: LimitType.Ten,
          cursor: paginaInfoCita,
        },
        lensConectado?.id
      );

      setReactors([...reactors, ...(data?.data?.publications?.items || [])]);
      setPaginaInfo(data?.data?.publications.pageInfo.next);

      if (
        !data?.data?.publications?.items ||
        data?.data?.publications?.items?.length < 10
      ) {
        setTieneMas(false);
        return;
      } else if (data?.data?.publications?.items?.length === 10) {
        setTieneMas(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const showMoreActors = async () => {
    if (!paginaInfo || !tieneMas) return;

    try {
      const data = await whoActedPublication(
        {
          on: id,
          limit: LimitType.Ten,
          cursor: paginaInfo,
        },
        lensConectado?.id
      );

      setReactors([
        ...reactors,
        ...(data?.data?.whoActedOnPublication?.items || []),
      ]);
      setPaginaInfo(data?.data?.whoActedOnPublication.pageInfo.next);

      if (
        !data?.data?.whoActedOnPublication?.items ||
        data?.data?.whoActedOnPublication?.items?.length < 10
      ) {
        setTieneMas(false);
        return;
      } else if (data?.data?.whoActedOnPublication?.items?.length === 10) {
        setTieneMas(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // const showMoreFollowing = async () => {
  //   if (!paginaInfo || !tieneMas) return;
  //   try {
  //     const data = await following(
  //       {
  //         for: id,
  //         limit: LimitType.Ten,
  //         cursor: paginaInfo,
  //       },
  //       lensConectado?.id
  //     );

  //     setReactors([...reactors, ...(data?.data?.following?.items || [])]);
  //     setPaginaInfo(data?.data?.following.pageInfo.next);

  //     if (
  //       !data?.data?.following?.items ||
  //       data?.data?.following?.items?.length < 10
  //     ) {
  //       setTieneMas(false);
  //       return;
  //     } else if (data?.data?.following?.items?.length === 10) {
  //       setTieneMas(true);
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // };

  // const showMoreFollowers = async () => {
  //   if (!paginaInfo || !tieneMas) return;
  //   try {
  //     const data = await followers(
  //       {
  //         of: id,
  //         limit: LimitType.Ten,
  //         cursor: paginaInfo,
  //       },
  //       lensConectado?.id
  //     );
  //     setReactors([...reactors, ...(data?.data?.followers?.items || [])]);
  //     setPaginaInfo(data?.data?.followers.pageInfo.next);

  //     if (
  //       !data?.data?.followers?.items ||
  //       data?.data?.followers?.items?.length < 10
  //     ) {
  //       setTieneMas(false);
  //       return;
  //     } else if (data?.data?.followers?.items?.length === 10) {
  //       setTieneMas(true);
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // };

  const showMoreQuoteMirrors = async () => {
    if ((!paginaInfo || !tieneMas) && (!paginaInfoCita || !tieneMasCita))
      return;

    try {
      if (tieneMas && paginaInfo) {
        const mirrorData = await getPublications(
          {
            limit: LimitType.Ten,
            where: {
              mirrorOn: id,
            },
            cursor: paginaInfo,
          },
          lensConectado?.id
        );
        setReactors([
          ...reactors,
          ...(mirrorData?.data?.publications?.items || []),
        ]);
        setPaginaInfo(mirrorData?.data?.publications.pageInfo.next);

        if (
          !mirrorData?.data?.publications?.items ||
          mirrorData?.data?.publications?.items?.length < 10
        ) {
          setTieneMas(false);
          return;
        } else if (mirrorData?.data?.publications?.items?.length === 10) {
          setTieneMas(true);
        }
      }

      if (paginaInfoCita && tieneMasCita) {
        const quoteData = await getPublications(
          {
            limit: LimitType.Ten,
            where: {
              mirrorOn: id,
            },
            cursor: paginaInfoCita,
          },
          lensConectado?.id
        );

        setQuoters([
          ...quoters,
          ...(quoteData?.data?.publications?.items || []),
        ] as (Quote & {
          decrypted: any;
        })[]);
        setPaginaInfoCita(quoteData?.data?.publications.pageInfo.next);

        if (
          !quoteData?.data?.publications?.items ||
          quoteData?.data?.publications?.items?.length < 10
        ) {
          setTieneMasCita(false);
          return;
        } else if (quoteData?.data?.publications?.items?.length === 10) {
          setTieneMasCita(true);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const muestraMas = () => {
    switch (tipo) {
      case dict.Home.Likes:
        showMoreLikes();
        break;

      case "Acts":
        showMoreActors();
        break;

      case dict.Home.Mirrors:
        showMoreQuoteMirrors();
        break;

      case dict.Home.Comments:
        showMoreComments();
        break;

      // case "Followers":
      //   showMoreFollowers();
      //   break;

      // case "Following":
      //   showMoreFollowing();
      //   break;
    }
  };

  useEffect(() => {
    if (id) {
      switch (tipo) {
        case dict.Home.Likes:
          reactors?.length < 1 && showLikes();
          break;

        case "Acts":
          reactors?.length < 1 && showActors();
          break;

        case dict.Home.Mirrors:
          quoters?.length < 1 && reactors?.length < 1 && showMirrorQuotes();
          break;

        case dict.Home.Comments:
          reactors?.length < 1 && showComments();
          break;

        // case "Followers":
        //   reactors?.length < 1 && showFollowers();
        //   break;

        // case "Following":
        //   reactors?.length < 1 && showFollowing();
        //   break;
      }
    } else {
      setPaginaInfo(undefined);
      setPaginaInfoCita(undefined);
      setReactors([]);
      setQuoters([]);
      setTieneMas(true);
      setTieneMasCita(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
    }
  }, [id]);

  return {
    mirrorQuote,
    datosCargando,
    setMirrorQuote,
    tieneMas,
    tieneMasCita,
    muestraMas,
    reactors,
    quoters,
    setReactors,
    setQuoters,
  };
};

export default useMostrar;
