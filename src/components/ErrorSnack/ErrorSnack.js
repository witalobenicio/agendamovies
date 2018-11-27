/* @flow */
import React from 'react';

import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';
import connect from 'react-redux/es/connect/connect';

import Snackbar from '@material-ui/core/Snackbar';

import { hide } from '~/store/snackVisibility/action';

type Props = {
  dispatch?: any,
  snack?: {
    visibility: boolean,
    message: string,
  }
}

class ErrorSnack extends React.Component<Props, void> {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    (() => {
      if (nextProps.snack.visibility === false) return;
      if (nextProps.snack.visibility === this.props.snack.visibility) return;
      if (!nextProps.snack.message || nextProps.snack.message === '') return;
      this.setState({ open: true });
    })();
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.dispatch(hide());
  };

  render() {
    const { message } = this.props.snack;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={4000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getSnack = createImmutableSelector([state => state], state =>
  state.getIn(['snackVisibility']).toJS());

function mapStateToProps(state) {
  return {
    snack: getSnack(state).payload,
  };
}

export default connect(mapStateToProps)(ErrorSnack);
