import * as React from "react";
import { useParams, NavLink } from "react-router-dom";
import api from "../utils/api";
import { character } from "./Character";
import { CharacterEpisode } from "./CharacterEpisode";

export interface ICharacterIdProps {}

export function CharacterId(props: ICharacterIdProps) {
  let { id } = useParams<{ id: string }>();

  const [characterId, setCharacterId] = React.useState<character>();

  let characterLink = "https://rickandmortyapi.com/api/character/" + id;

  React.useEffect(() => {
    api
      .getCharacted(characterLink)
      .then((res: character) => {
        setCharacterId(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <h2 className="">{characterId?.name}</h2>
      <ul className="">
        <li className="">Status: {characterId?.status}</li>
        <li className="">Species: {characterId?.species}</li>
        <li className="">
          {characterId?.type ? `Type: ${characterId.type}` : ``}
        </li>
        <li className="">Gender: {characterId?.gender}</li>
      </ul>
      <p className="">
        Location:{" "}
        <NavLink
          className=""
          exact
          to={`/location/${characterId?.location.url.substr(41)}`}
        >
          {characterId?.location.name}
        </NavLink>
      </p>
      <p className="">Episodes:</p>
      <ul className="">
        {characterId?.episode.map((link) => (
          //можно решить иначе через "Get multi", один раз сделать запрос и перебрать полученный массив
          <CharacterEpisode link={link} />
        ))}
      </ul>
    </div>
  );
}
