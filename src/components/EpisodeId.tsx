import * as React from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import { character, Character } from "./Character";

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
  const [idCharacters, setIdCharacters] = React.useState('');
  const [allCharacters, setAllCharacters] = React.useState([]);

  React.useEffect(() => {
    api
      .getEpisode(id)
      .then((res) => {
        setEpisode(res);
        const characterId = res.characters.map((item: string) => {
          return item.substr(42);
        });
        setIdCharacters(characterId.join(','));
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getAllCharacted(idCharacters)
      .then((res) => setAllCharacters(res))
      .catch((err) => console.log(err));
  }, [idCharacters])


  return (
    <div className="episode-id">
      <h2 className="">{episode?.name}</h2>
      <p>Date: {episode?.air_date}</p>
      <p className="">Episode: {episode?.episode}</p>
      <p className="">Characted:</p>
      {allCharacters.length ? (allCharacters.map((character: character) => (
        <Character character={character} key={character.id} />
      ))) : ''}
    </div>
  );
}
