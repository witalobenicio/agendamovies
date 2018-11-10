/* eslint-disable react/prefer-stateless-function */
/* @flow */

import React from 'react';

import Button from '@material-ui/core/Button';
import ProductCart from './components/ProductCart';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { Money } from '~/common';

import style from './Cart.less';

type Props = {
  cart: [];
  onPressBuyMore: () => void,
  onPressAddRemove: () => void,
}

function getTotal(cart) {
  return cart.reduce((acc, cur) =>
    (cur.boughtQuantity * cur.price) + (acc || 0), 0);
}

class Cart extends React.Component<Props, void> {
  state = {
    showDialogRemove: false,
    dialogDescription: '',
  };

  onPressBuyMore = (e) => {
    this.props.onPressBuyMore(this.props.cart, e);
  };

  removeProduct = () => {
    this.setState({ showDialogRemove: false });
    const { product, quantityRemove } = this.state;
    if (product && quantityRemove) {
      this.props.onPressAddRemove(quantityRemove, product, false);
    }
  };

  handleCloseModalRemove = () => {
    this.setState({ showDialogRemove: false });
  };

  showModalRemove = (quantityRemove, product) => {
    this.setState({
      showDialogRemove: true,
      dialogDescription: `Deseja realmente remover o produto ${product.title} do carrinho?`,
      product,
      quantityRemove,
    });
  };

  render() {
    const { cart } = this.props;
    return (
      <div style={{ paddingBottom: '20px' }}>
        <Dialog
          disableBackdropClick
          open={this.state.showDialogRemove}
          onClose={this.handleCloseModalRemove}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Remover produto
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.dialogDescription}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModalRemove} color="danger" autoFocus>
              Não
            </Button>
            <Button onClick={this.removeProduct} color="primary">
              Sim
            </Button>
          </DialogActions>
        </Dialog>
        <h2>Meu Carrinho</h2>
        <span>Confira os itens adicionados</span>
        <div className={style.actionsContainer}>
          <Button
            onClick={this.onPressBuyMore}
            variant="contained"
            color="secondary"
            className={style.productBuyAction}
          >
            Comprar mais produtos
          </Button>
          <Button
            disabled={cart.length === 0}
            variant="contained"
            color="primary"
            className={style.productBuyAction}
          >
            Finalizar compra
          </Button>
        </div>
        <div className={style.productsContainer}>
          <div className={style.topProductsContainer}>
            <h3 style={{ width: '60%' }}>Produto</h3>
            <h3 style={{ width: '20%' }}>Quantidade</h3>
            <h3 style={{ width: '10%' }}>Preço</h3>
            <h3 style={{ width: '10%' }}>Total</h3>
          </div>
          <div>
            {
              cart.length > 0 ? cart.map((product) => (
                <ProductCart
                  showModalRemove={this.showModalRemove}
                  onPressAddRemove={this.props.onPressAddRemove}
                  key={product.id}
                  product={product}
                />
              ))
                :
              <h4 className={style.emptyCart}>Seu carrinho está vazio! :(</h4>
            }
          </div>
        </div>
        <div className={style.totalContainer}>
          <div />
          <div className={style.totalPriceContainer}>
            <span className={style.totalTitle}>Valor total</span>
            <h2 className={style.totalPrice}>{Money(getTotal(cart))}</h2>
          </div>
        </div>
        <div className={style.actionsContainer}>
          <Button
            onClick={this.onPressBuyMore}
            variant="contained"
            color="secondary"
            className={style.productBuyAction}
          >
            Comprar mais produtos
          </Button>
          <Button
            disabled={cart.length === 0}
            variant="contained"
            color="primary"
            className={style.productBuyAction}
          >
            Finalizar compra
          </Button>
        </div>
      </div>
    );
  }
}

export default Cart;
