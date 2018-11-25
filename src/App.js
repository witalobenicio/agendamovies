import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import styles from './App.less';
import theme from './theme';
import Header from './components/Header/Header';
import store from '~/store';
import renderScreens from '~/screens';
import ErrorDialog from '~/components/ErrorDialog/ErrorDialog';
import { success as successCart } from './store/cart/action';

type Props = {
  // children: any,
}


class App extends Component<Props, void> {
  state = {};
  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    store.dispatch(successCart(cart));
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <CssBaseline />
            <Router>
              <div className={styles.rootContainer}>
                <Header />
                <ErrorDialog />
                <Switch>
                  {renderScreens()}
                </Switch>
              </div>
            </Router>
          </React.Fragment>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
