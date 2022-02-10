import * as React from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import { character, Character } from "./Character";

export interface location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: [];
  url: string;
  created: string;
}

export interface ILocationIdProps {}

export function LocationId(props: ILocationIdProps) {
  let { id } = useParams<{ id: string }>(); //получаем id локации

  const [location, setLocation] = React.useState<location>();
  const [idCharacters, setIdCharacters] = React.useState('');
  const [allCharacters, setAllCharacters] = React.useState([]);

  React.useEffect(() => { //получаем данные по локации
    api
      .getLocation(id)
      .then((res: location) => {
        setLocation(res);
        const characterId = res.residents.map((item: string) => {
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
    <div className="">
      <h2 className="">{location?.name}</h2>
      <p className="">Dimension: {location?.dimension}</p>
      {location?.type ? (<p className="">Type: {location.type}</p>) : ''}
      <p className="">Residents:</p>
      {allCharacters.length ? (allCharacters.map((character: character) => (
        <Character character={character} key={character.id} />
      ))) : ''}
    </div>
  );
}
