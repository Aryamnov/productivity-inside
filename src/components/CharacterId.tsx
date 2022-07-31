import * as React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import api from '../utils/api';
import { Icharacter } from './Character';
import { Iepisode } from './EpisodeId';
import { Episode } from './Episode';
import { characterLink } from '../utils/constants';

export interface ICharacterIdProps {}

export function CharacterId() {
  const { id } = useParams<{ id: string }>(); // получаем id персонажа

  const [characterId, setCharacterId] = React.useState<Icharacter>();
  const [idEpisodes, setIdEpisodes] = React.useState('');
  const [allEpisodes, setAllEpisodes] = React.useState([]);

  React.useEffect(() => {
    api
      .getCharacted(characterLink + id)
      .then((res: Icharacter) => {
        setCharacterId(res);
        const episodeId = res.episode.map((item: string) => item.substr(40));
        setIdEpisodes(episodeId.join(','));
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getAllEpisode(idEpisodes)
      .then((res) => setAllEpisodes(res))
      .catch((err) => console.log(err));
  }, [idEpisodes]);

  return (
    <div className="character-id">
      <h2 className="character-id__title">{characterId?.name}</h2>
      <ul className="character-id__list">
        <li className="character-id__element">Status: {characterId?.status}</li>
        <li className="character-id__element">
          Species: {characterId?.species}
        </li>
        {characterId?.type ? (
          <li className="character-id__element">Type: {characterId.type}</li>
        ) : (
          ''
        )}
        <li className="character-id__element">Gender: {characterId?.gender}</li>
      </ul>
      <p className="character-id__location">
        Location:{' '}
        <NavLink
          className="character-id__link"
          exact
          to={`/location/${characterId?.location.url.substr(41)}`}
        >
          {characterId?.location.name}
        </NavLink>
      </p>
      <p className="character-id__subtitle">Episodes:</p>
      <ul className="character-id__episodes">
        {allEpisodes.length ? (
          allEpisodes.map((episode: Iepisode) => (
            <Episode episode={episode} key={episode?.id} />
          ))
        ) : (
          <Episode episode={allEpisodes as any} />
        )}
      </ul>
    </div>
  );
}
