import * as React from "react";
import api from "../utils/api";
import { Episode } from "./Episode";

export interface episodes {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: any;
  };
  results: [];
  next: string;
}

export interface IMainProps {}

export function Main(props: IMainProps) {
  const [episodes, setEpisodes] = React.useState<episodes>();

  React.useEffect(() => {
    api
      .getEpisodes()
      .then((res: episodes) => {
        setEpisodes(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main">
      {episodes
        ? episodes.results.map((episode: any) => (
            <Episode episode={episode} key={episode.id} />
          ))
        : ""}
    </div>
  );
}
