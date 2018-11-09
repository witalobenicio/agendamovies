/* eslint-disable jsx-a11y/anchor-is-valid */
/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
import style from './ProductItem.less';
import imageError from '~/assets/img/noImage.png';
import { Money } from '~/common';

type Props = {
  item: {
    id: number,
    title: string,
    price: number,
    picture: string,
  },
  onPressBuy: () => void,
  // description: string,
  // memory: string,
  // brand: string,
  // chipType: string,
  // quantity: number,
};

function onError(e) {
  e.target.onerror = null;
  e.target.src = imageError;
}

const ProductItem = (props: Props) => {
  const {
    id, title, picture, price,
  } = props.item;
  return (
    <Grid item key={id} xs={2}>
      <Paper className={style.productCard} elevation={1}>
        <img
          src={picture}
          alt={title}
          onError={onError}
          className={style.productPicture}
        />
        <div className={style.productInfo}>
          <h4 className={style.productName}>
            <Link to={`/products/${id}`}>
              {title}
            </Link>
          </h4>
          <span className={style.productPrice}>{Money(price)}</span>
        </div>
        <div className={style.addRemoveContainer}>
          <Button
            onClick={() => { props.onPressBuy(props.item); }}
            variant="contained"
            color="secondary"
            className={style.productBuyAction}
          >
            Comprar
          </Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default ProductItem;
