import * as React from "react";
import { useParams, NavLink } from "react-router-dom";
import api from "../utils/api";
import { character } from "./Character";
import { episode } from "./EpisodeId";
import { Episode } from "./Episode";
import { characterLink } from "../utils/constants";

export interface ICharacterIdProps {}

export function CharacterId(props: ICharacterIdProps) {
  let { id } = useParams<{ id: string }>(); //получаем id персонажа

  const [characterId, setCharacterId] = React.useState<character>();
  const [idEpisodes, setIdEpisodes] = React.useState("");
  const [allEpisodes, setAllEpisodes] = React.useState([]);

  React.useEffect(() => {
    api
      .getCharacted(characterLink + id)
      .then((res: character) => {
        setCharacterId(res);
        const episodeId = res.episode.map((item: string) => {
          return item.substr(40);
        });
        setIdEpisodes(episodeId.join(","));
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
        <li className="character-id__element">Species: {characterId?.species}</li>
        {characterId?.type ? (
          <li className="character-id__element">Type: {characterId.type}</li>
        ) : (
          ""
        )}
        <li className="character-id__element">Gender: {characterId?.gender}</li>
      </ul>
      <p className="character-id__location">
        Location:{" "}
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
        {allEpisodes.length
          ? allEpisodes.map((episode: episode) => (
              <Episode episode={episode} key={episode?.id} />
            ))
          : ""}
      </ul>
    </div>
  );
}
