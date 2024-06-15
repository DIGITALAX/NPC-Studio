import { useState } from "react";
import { Comment, Mirror, Post, Quote } from "../../../../graphql/generated";

const useFeed = () => {
  const [feedCargando, setFeedCargando] = useState<boolean>(false);
  const [feedActual, setFeedActual] = useState<
    (Post | Comment | Quote | Mirror)[]
  >([]);

  const llamarFeed = async () => {};

  return {
    feedCargando,
  };
};

export default useFeed;
