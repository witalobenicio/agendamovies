import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';
import style from '../App.less';

export default function renderScreens() {
  return (
    <main className={style.main}>
      <Route exact path="/" component={routes.Products} />
      <Route exact path="/products/:id" component={routes.ProductDetail} />
    </main>
  );
}
