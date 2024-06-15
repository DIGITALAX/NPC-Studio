import { FunctionComponent } from "react";
import {
  ArticleMetadataV3,
  ImageMetadataV3,
  Post,
  Quote,
  StoryMetadataV3,
  TextOnlyMetadataV3,
} from "../../../../graphql/generated";
import { TiposPublicacionesProps } from "../types/common.types";
import Texto from "./Texto";
import Medios from "./Medios";

const TiposPublicaciones: FunctionComponent<TiposPublicacionesProps> = ({
  elemento,
  setVerImagen
}): JSX.Element => {
  switch (
    elemento?.__typename === "Mirror"
      ? elemento?.mirrorOn?.metadata?.__typename
      : (elemento as Post | Quote)?.metadata?.__typename
  ) {
    case "ArticleMetadataV3":
    case "TextOnlyMetadataV3":
    case "StoryMetadataV3":
      return (
        <Texto
          metadata={
            (elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn?.metadata
              : (elemento as Post)?.metadata) as
              | ArticleMetadataV3
              | StoryMetadataV3
              | TextOnlyMetadataV3
          }
        />
      );

    default:
      return (
        <Medios
          metadata={
            (elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn?.metadata
              : (elemento as Post)?.metadata) as ImageMetadataV3
          }
          setVerImagen={setVerImagen}
        />
      );
  }
};

export default TiposPublicaciones;
