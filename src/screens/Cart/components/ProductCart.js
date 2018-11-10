/* @flow */

import React from 'react';

import { Image } from '~/components';
import { Money } from '~/common';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import _ from 'lodash';

import style from '../Cart.less';

type Props = {
  product: {
    boughtQuantity: number,
  },
  onPressAddRemove: () => void,
  showModalRemove: () => void,
}

class ProductCart extends React.PureComponent<Props, void> {
  constructor(props) {
    super(props);
    this.state = {
      lastQuantity: props.product.boughtQuantity,
    };
  }

  componentWillReceiveProps({ product }) {
    this.setState({ lastQuantity: product.boughtQuantity });
  }

  onPressAddRemove(qty) {
    const { product } = this.props;
    const quantity = product.boughtQuantity + qty;
    if (quantity > 0) {
      this.setState({ lastQuantity: quantity });
      this.props.onPressAddRemove(qty, product, qty > 0);
    } else if (quantity === 0) {
      this.props.showModalRemove(qty, product);
    }
  }

  onBlur = () => {
    const { lastQuantity } = this.state;
    const { product } = this.props;
    const qty = Number.parseInt(lastQuantity, 10) - product.boughtQuantity;
    this.props.onPressAddRemove(qty, product, qty > 0);
  };

  onQuantityChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    this.setState({ lastQuantity: onlyNums });
  };

  render() {
    const { product } = this.props;
    return (
      <div className={style.productCartContainer}>
        <div className={style.productContainer}>
          <Image
            className={style.picture}
            src={product.picture}
            alt={product.title}
          />
          <span className={style.name}>
            {product.title}
          </span>
        </div>
        <div className={style.addRemoveContainer}>
          <Button
            onClick={() => this.onPressAddRemove(-1)}
            variant="fab"
            mini
            color="secondary"
            aria-label="Remove"
          >
            <RemoveIcon />
          </Button>
          <TextField
            className={style.quantityField}
            id="outlined-bare"
            inputProps={
              {
                style: {
                  textAlign: 'center',
                },
              }
            }
            onBlur={this.onBlur}
            onChange={this.onQuantityChange}
            value={this.state.lastQuantity}
            margin="normal"
            variant="outlined"
          />
          <Button
            onClick={() => this.onPressAddRemove(1)}
            variant="fab"
            mini
            color="secondary"
            aria-label="Add"
          >
            <AddIcon />
          </Button>
        </div>
        <div style={{ width: '10%' }}>
          <span className={style.productPrice}>{Money(product.price)}</span>
        </div>
        <div style={{ width: '10%' }}>
          <span className={style.productPriceTotal}>
            {Money(product.boughtQuantity * product.price)}
          </span>
        </div>
      </div>
    );
  }
}

export default ProductCart;
