import * as React from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import { Character } from "./Character";

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

  React.useEffect(() => { //получаем данные по локации
    api
      .getLocation(id)
      .then((res: location) => setLocation(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <h2 className="">{location?.name}</h2>
      <p className="">Dimension: {location?.dimension}</p>
      {location?.type ? (<p className="">Type: {location.type}</p>) : ''}
      <p className="">Residents:</p>
      {location?.residents.map((character: string) => (
        //можно решить иначе через "Get multi", один раз сделать запрос и перебрать полученный массив
        <Character characterLink={character} key={character.substr(42)} />
      ))}
    </div>
  );
}
