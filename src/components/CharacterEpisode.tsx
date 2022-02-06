import * as React from "react";
import api from "../utils/api";
import { Episode } from "./Episode";
import { episode } from "./EpisodeId";

export interface ICharacterEpisodeProps {
  link: string;
}

export function CharacterEpisode(props: ICharacterEpisodeProps) {
  const [episode, setEpisode] = React.useState<episode>();

  React.useEffect(() => {
    api.getEpisodeUrl(props.link).then((res: episode) => {
      setEpisode(res);
    });
  }, []);

  return <Episode episode={episode} key={episode?.id} />;
}
