import * as React from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Icharacter, Character } from './Character';

export interface Iepisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [];
  url: string;
  created: string;
}

export interface IEpisodeIdProps {}

export function EpisodeId() {
  const { id } = useParams<{ id: string }>(); // получаем id эпизода

  const [episode, setEpisode] = React.useState<Iepisode>();
  const [idCharacters, setIdCharacters] = React.useState('');
  const [allCharacters, setAllCharacters] = React.useState([]);

  React.useEffect(() => {
    api
      .getEpisode(id)
      .then((res) => {
        setEpisode(res);
        const characterId = res.characters.map((item: string) => item.substr(42));
        setIdCharacters(characterId.join(','));
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getAllCharacted(idCharacters)
      .then((res) => setAllCharacters(res))
      .catch((err) => console.log(err));
  }, [idCharacters]);

  return (
    <div className="episode-id">
      <h2 className="episode-id__title">{episode?.name}</h2>
      <p>Date: {episode?.air_date}</p>
      <p className="episode-id__episode">Episode: {episode?.episode}</p>
      <p className="episode-id__characted">Characters:</p>
      {allCharacters.length
        ? allCharacters.map((character: Icharacter) => (
            <Character character={character} key={character.id} />
        ))
        : ''}
    </div>
  );
}
