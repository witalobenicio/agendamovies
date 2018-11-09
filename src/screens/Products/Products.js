/* @flow */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductItem from './components/ProductItem';
import style from './Products.less';

type Props = {
  products: [];
  onPressBuy: () => void,
  onPressProduct: () => void,
}

class Products extends React.PureComponent<Props, void> {
  render() {
    const { products } = this.props;
    return (
      <div>
        <span className={style.descriptionQuantityShowing}>
          Exibindo {products.length} de {products.length} produtos
        </span>
        <Grid container alignItems="center">
          {products && products.map((product) => (
            <ProductItem
              onPressBuy={this.props.onPressBuy}
              onPressProduct={this.props.onPressProduct}
              key={product.id}
              item={product}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default Products;
