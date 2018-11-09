import React from 'react';
import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import style from './Header.less';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AppBar from '@material-ui/core/AppBar';
import Immutable from 'immutable';

import { Money } from '~/common';


type Props = {
  cart: any,
};

function getTotal(cart) {
  return cart.reduce((acc, cur) =>
    (cur.quantity * cur.price) + (acc || 0), 0);
}

const Header = ({ cart }: Props) => (
  <AppBar position="fixed" color="primary">
    <div className={style.headerContent}>
      <Toolbar className={style.header}>
        <Typography variant="h6" color="inherit" noWrap>
          E-Master commerce
        </Typography>
        <div>
          <IconButton color="inherit">
            { cart.payload.length > 0 ?
              <Badge badgeContent={cart.payload.length} color="error">
                <ShoppingBasketIcon />
              </Badge>
            :
              <ShoppingBasketIcon />
          }
          </IconButton>
          <div>
            <span>Total</span>
            <span>{Money(getTotal(cart.payload))}</span>
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

export default connect(mapStateToProps)(Header);
