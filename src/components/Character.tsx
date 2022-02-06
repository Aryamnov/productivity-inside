import * as React from "react";
import api from "../utils/api";
import { NavLink } from "react-router-dom";

export interface character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [];
  url: string;
  created: string;
}

export interface ICharacterProps {
  characterLink: string;
}

export function Character(props: ICharacterProps) {
  const [character, setCharacter] = React.useState<character>();

  React.useEffect(() => {
    api
      .getCharacted(props.characterLink)
      .then((res: character) => setCharacter(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <h2 className="">{character?.name}</h2>
      <ul className="">
        <li className="">Status: {character?.status}</li>
        <li className="">Species: {character?.species}</li>
        <li className="">{character?.type ? `Type: ${character.type}` : ``}</li>
        <li className="">Gender: {character?.gender}</li>
      </ul>
      <NavLink exact to={`/characted/${character?.id}`} className="">
        More about {character?.name}
      </NavLink>
    </div>
  );
}
