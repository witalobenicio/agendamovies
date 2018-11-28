import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';
import style from '../App.less';

export default function renderScreens() {
  return (
    <main className={style.main}>
      <Route exact path="/" component={routes.Movies} />
      <Route exact path="/favorites" component={routes.FavoriteMovies} />
      <Route exact path="/trending" component={routes.TrendingMovies} />
      <Route exact path="/movies/:id" component={routes.MovieDetail} />
    </main>
  );
}
