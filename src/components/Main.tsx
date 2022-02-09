import * as React from "react";
import api from "../utils/api";
import { Episode } from "./Episode";

export interface IMainProps {}

export function Main(props: IMainProps) {
  const [episodes, setEpisodes] = React.useState<Array<{}>>();
  const [link, setLink] = React.useState(
    "https://rickandmortyapi.com/api/episode?page=1"
  );
  const [isFetching, setIsFetching] = React.useState(true);
  const [isAllCard, setIsAllCard] = React.useState(false);

  React.useEffect(() => {
    if (isFetching && !isAllCard) {
      //при запросе и наличию карточек на сервере
      api
        .getEpisodeUrl(link) //запрос на сервер
        .then((res: any) => {
          if (episodes) {
            const newArr = episodes.concat(res.results);
            setEpisodes(newArr);
          } else {
            setEpisodes(res.results);
          }
          if (res.info.next) {
            setLink(res.info.next);
          } else {
            setIsAllCard(true); //если карточки на сервере закончились
          }
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [isFetching]);

  const checkPosition = () => {
    // проверяем положение на странице
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 2;
    const position = scrolled + screenHeight;
    if (position >= threshold) {
      //если перешли границу, то новый запрос на сервер
      setIsFetching(true);
    }
  };

  React.useEffect(() => {
    //в зависимости от задачи, возможно, стоит добавить событие "resize"
    window.addEventListener("scroll", checkPosition);
    return function () {
      document.removeEventListener("scroll", checkPosition);
    };
  }, []); //эффект добавляет слушателя по скролу

  return (
    <div className="main">
      {episodes
        ? episodes.map((episode: any) => (
            <Episode episode={episode} key={episode.id} />
          ))
        : ""}
    </div>
  );
}
