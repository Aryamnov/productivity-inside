import * as React from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Icharacter, Character } from './Character';

export interface Ilocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: [];
  url: string;
  created: string;
}

export interface ILocationIdProps {}

export function LocationId() {
  const { id } = useParams<{ id: string }>(); // получаем id локации

  const [location, setLocation] = React.useState<Ilocation>();
  const [idCharacters, setIdCharacters] = React.useState('');
  const [allCharacters, setAllCharacters] = React.useState([]);

  React.useEffect(() => {
    // получаем данные по локации
    api
      .getLocation(id)
      .then((res: Ilocation) => {
        setLocation(res);
        const characterId = res.residents.map((item: string) => item.substr(42));
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
    <div className="location">
      <h2 className="location__title">{location?.name}</h2>
      <p className="location__text">Dimension: {location?.dimension}</p>
      {location?.type ? (
        <p className="location__type">Type: {location.type}</p>
      ) : (
        ''
      )}
      <p className="location__residents">Residents:</p>
      {allCharacters.length ? (
        allCharacters.map((character: Icharacter) => (
          <Character character={character} key={character.id} />
        ))
      ) : (
        <Character character={allCharacters as any} />
      )}
    </div>
  );
}
