import * as React from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import { Character } from "./Character";

export interface episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [];
  url: string;
  created: string;
}

export interface IEpisodeIdProps {}

export function EpisodeId(props: IEpisodeIdProps) {
  let { id } = useParams<{ id: string }>(); //получаем id эпизода

  const [episode, setEpisode] = React.useState<episode>();

  React.useEffect(() => {
    api
      .getEpisode(id)
      .then((res) => setEpisode(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="episode-id">
      <h2 className="">{episode?.name}</h2>
      <p>Date: {episode?.air_date}</p>
      <p className="">Episode: {episode?.episode}</p>
      <p className="">Characted:</p>
      {episode?.characters.map((character: string) => (
        //можно решить иначе через "Get multi", один раз сделать запрос и перебрать полученный массив
        <Character characterLink={character} key={character.substr(42)} />
      ))}
    </div>
  );
}
