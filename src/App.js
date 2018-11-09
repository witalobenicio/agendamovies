import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './App.less';
import theme from './theme';
import Header from './components/Header/Header';
import store from '~/store';
import renderScreens from '~/screens';

type Props = {
  // children: any,
}


class App extends Component<Props, void> {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <CssBaseline />
            <Header />
            <Router>
              <Switch>
                {renderScreens()}
              </Switch>
            </Router>
          </React.Fragment>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
