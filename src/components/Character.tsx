import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface Icharacter {
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
  character: Icharacter;
}

export function Character(props: ICharacterProps) {
  return (
    <div className="character">
      <h2 className="character__title">{props.character.name}</h2>
      <ul className="character__list">
        <li className="character__element">Status: {props.character.status}</li>
        <li className="character__element">
          Species: {props.character.species}
        </li>
        {props.character.type ? (
          <li className="character__element">Type: {props.character.type}</li>
        ) : (
          ''
        )}
        <li className="character__element">Gender: {props.character.gender}</li>
      </ul>
      <NavLink
        exact
        to={`/characted/${props.character.id}`}
        className="character__link"
      >
        More about {props.character.name}
      </NavLink>
    </div>
  );
}
