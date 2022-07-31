import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IEpisodeProps {
  episode:
  | {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: [];
  }
  | undefined;
}

export function Episode(props: IEpisodeProps) {
  return (
    <div className="episode">
      <h2 className="episode__title">{props.episode?.name}</h2>
      <p className="episode__date">Date: {props.episode?.air_date}</p>
      <p className="episode__number">Episode: {props.episode?.episode}</p>
      <Link to={`/episode/${props.episode?.id}`} className="episode__about">Подробнее</Link>
    </div>
  );
}
