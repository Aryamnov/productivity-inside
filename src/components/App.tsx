import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main } from './Main';
import { EpisodeId } from './EpisodeId';
import { CharacterId } from './CharacterId';
import { LocationId } from './LocationId';
import { NotFound } from './NotFound';

export interface IAppProps {}

export function App() {
  return (
    <div className="page">
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
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
