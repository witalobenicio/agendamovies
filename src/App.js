import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './App.css';
import store from '~/store';


class App extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <AppBar position="fixed" color="primary" classes="appbar">
            <Toolbar />
          </AppBar>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
