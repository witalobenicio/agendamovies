/* @flow */
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import style from './BottomTabs.less';
import { withRouter } from 'react-router-dom';

type Props = {
  history: any,
}

function getInitialValue(pathname) {
  if (pathname === '/') return 0;
  if (pathname.includes('/trending')) return 1;
  if (pathname.includes('/favorites')) return 2;
  return 0;
}

class BottomTabs extends React.PureComponent<Props, void> {
  constructor(props) {
    super(props);
    const { history } = props;
    const { pathname } = history.location;
    this.state = {
      value: getInitialValue(pathname),
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
    const { history } = this.props;
    const { pathname } = history.location;
    switch (value) {
      case 0:
        if (pathname !== '/') {
          history.replace('/');
        }
        break;
      case 1:
        if (!pathname.includes('/trending')) {
          history.replace('/trending');
        }
        break;
      case 2:
        if (!pathname.includes('/favorites')) {
          history.replace('/favorites');
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { value } = this.state;
    return (
      <BottomNavigation
        value={value}
        className={style.container}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction
          className={value === 0 ? style.active : ''}
          label="Popular"
          icon={<StarIcon />}
        />
        <BottomNavigationAction
          className={value === 1 ? style.active : ''}
          label="Tendência"
          icon={<TrendingUpIcon />}
        />
        <BottomNavigationAction
          className={value === 2 ? style.active : ''}
          label="Favoritos"
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    );
  }
}

export default withRouter(BottomTabs);
