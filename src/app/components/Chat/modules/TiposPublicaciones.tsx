import {
  ArticleMetadata,
  ImageMetadata,
  StoryMetadata,
  TextOnlyMetadata,
} from "@lens-protocol/client";
import { FunctionComponent, JSX } from "react";
import { TiposPublicacionesProps } from "../types/chat.types";
import Medios from "./Medios";
import Texto from "./Texto";

const TiposPublicaciones: FunctionComponent<TiposPublicacionesProps> = ({
  elemento,
}): JSX.Element => {
  switch (elemento?.metadata?.__typename) {
    case "ArticleMetadata":
    case "TextOnlyMetadata":
    case "StoryMetadata":
      return (
        <Texto
          metadata={
            elemento?.metadata as
              | ArticleMetadata
              | StoryMetadata
              | TextOnlyMetadata
          }
        />
      );

    default:
      return <Medios metadata={elemento?.metadata as ImageMetadata} />;
  }
};

export default TiposPublicaciones;
