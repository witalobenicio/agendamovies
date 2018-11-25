/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compose } from 'recompose';
import Immutable from 'immutable';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';

import style from './Header.less';


type Props = {
  cart: any,
  history: any,
};

function getTotal(cart) {
  return cart.reduce((acc, cur) =>
    (cur.boughtQuantity * cur.price) + (acc || 0), 0);
}

function getTotalQuantity(cart) {
  return cart.reduce((acc, cur) =>
    (cur.boughtQuantity) + (acc || 0), 0);
}

function onPressCart(history) {
  history.replace('/cart/');
}

const Header = ({ cart, history }: Props) => (
  <AppBar position="static" color="primary">
    <div className={style.headerContent}>
      <Toolbar className={style.header}>
        <Typography className={style.title} variant="h6" color="inherit" noWrap>
          <Link to="/">Agenda Movies</Link>
        </Typography>
        <div className={style.rightContent}>
          <div className={style.searchContainer}>
            <SearchIcon className={style.searchIcon} />
            <InputBase
              placeholder="Buscar filmes..."
              className={style.searchInput}
            />
          </div>
        </div>
      </Toolbar>
    </div>
  </AppBar>
);

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getCart = createImmutableSelector([state => state], state =>
  state.getIn(['cart']).toJS());

function mapStateToProps(state) {
  return {
    cart: getCart(state),
  };
}

export default compose(connect(mapStateToProps), withRouter)(Header);
