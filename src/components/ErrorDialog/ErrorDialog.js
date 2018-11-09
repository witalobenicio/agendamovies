/* @flow */
import React from 'react';

import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';
import connect from 'react-redux/es/connect/connect';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { hide } from '~/store/dialogVisibility/action';

type Props = {
  dispatch?: any,
  dialog?: {
    visibility: boolean,
    title: string,
    description: string,
  }
}

class ErrorDialog extends React.PureComponent<Props, void> {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    (() => {
      if (nextProps.dialog.visibility === false) return;
      if (nextProps.dialog.visibility === this.props.dialog.visibility) return;
      if (!nextProps.dialog.title || nextProps.dialog.title === '') return;
      if (!nextProps.dialog.description || nextProps.dialog.description === '') return;
      this.setState({ open: true });
    })();
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.dispatch(hide());
  };

  render() {
    const { title, description } = this.props.dialog;
    return (
      <Dialog
        disableBackdropClick
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Entendi
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getDialog = createImmutableSelector([state => state], state =>
  state.getIn(['dialogVisibility']).toJS());

function mapStateToProps(state) {
  return {
    dialog: getDialog(state).payload,
  };
}

export default connect(mapStateToProps)(ErrorDialog);
