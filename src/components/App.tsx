import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Main } from "./Main";
import { EpisodeId } from "./EpisodeId";
import { CharacterId } from "./CharacterId";
import { LocationId } from "./LocationId";

export interface IAppProps {}

export function App(props: IAppProps) {
  return (
    <Switch>
      <Route path="/episode/:id">
        <EpisodeId />
      </Route>
      <Route path="/characted/:id">
        <CharacterId />
      </Route>
      <Route path="/location/:id">
        <LocationId />
      </Route>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  );
}
