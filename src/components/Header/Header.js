import React from 'react';
import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import style from './Header.less';
import { Money } from '~/common';


type Props = {
  cart: any,
};

function getTotal(cart) {
  return cart.reduce((acc, cur) =>
    (cur.boughtQuantity * cur.price) + (acc || 0), 0);
}

function getTotalQuantity(cart) {
  return cart.reduce((acc, cur) =>
    (cur.boughtQuantity) + (acc || 0), 0);
}

const Header = ({ cart }: Props) => (
  <AppBar position="static" color="primary">
    <div className={style.headerContent}>
      <Toolbar className={style.header}>
        <Typography variant="h6" color="inherit" noWrap>
          E-Master commerce
        </Typography>
        <div className={style.rightContent}>
          <IconButton color="inherit">
            { cart.payload.length > 0 ?
              <Badge badgeContent={getTotalQuantity(cart.payload)} color="error">
                <ShoppingBasketIcon className={style.bagIcon} />
              </Badge>
            :
              <ShoppingBasketIcon className={style.bagIcon} />
          }
          </IconButton>
          <div className={style.priceContainer}>
            <span className={style.totalDesc}>Total</span>
            <span>{Money(getTotal(cart.payload))}</span>
          </div>
        </div>
      </Toolbar>
      <Tabs value={0}>
        <Tab label="Celulares" />
        <Tab label="Acessórios" />
        <Tab label="Cabos" />
      </Tabs>
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

export default connect(mapStateToProps)(Header);
