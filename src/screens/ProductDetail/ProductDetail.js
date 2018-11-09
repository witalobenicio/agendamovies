/* eslint-disable react/prefer-stateless-function */
/* @flow */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Image from '~/components/Image/Image';

import { Money } from '~/common';

import style from './ProductDetail.less';
import Button from '@material-ui/core/Button';

type Props = {
  product: {};
  onPressBuy: () => void,
  // onPressProduct: () => void,
}

class ProductDetail extends React.Component<Props, void> {
  onPressBuy = (e) => {
    this.props.onPressBuy(this.props.product, e);
  };

  render() {
    const { product } = this.props;
    return (
      <div>
        <Paper
          className={style.card}
        >
          <Grid container spacing={24}>
            <Grid item xs={5} sm={4}>
              <Paper className={style.pictureContainer}>
                <Image className={style.picture} src={product.picture} alt={product.title} />
              </Paper>
            </Grid>
            <Grid item xs={7} sm={8}>
              <div>
                <h1 className={style.productName}>{product.title}</h1>
                {/* eslint-disable-next-line no-trailing-spaces */}
                <span className={style.priceTitle}>Por:
                  <span className={style.productPrice}>{Money(product.price)}</span>
                </span>
              </div>
              <div className={style.buyContainer}>
                <Button
                  onClick={this.onPressBuy}
                  variant="contained"
                  color="secondary"
                >
                  Comprar
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <div>
          <h3 className={style.infoTitle}>Descrição</h3>
          <span className={style.productDescription}>{product.description}</span>
        </div>
        <div>
          <h3 className={style.infoTitle}>Características</h3>
          { product.brand ?
            <div className={style.info}>
              <strong><span className={style.productDescription}>Marca</span></strong>
              <span className={style.productDescription}>{product.brand}</span>
            </div>
            :
            null
          }
          { product.chipType ?
            <div className={style.info}>
              <strong><span className={style.productDescription}>Chip</span></strong>
              <span className={style.productDescription}>{product.chipType}</span>
            </div>
            :
            null
          }
          { product.memory ?
            <div className={style.info}>
              <strong><span className={style.productDescription}>Memória</span></strong>
              <span className={style.productDescription}>{product.memory}</span>
            </div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default ProductDetail;
