/* @flow */
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import style from './BottomTabs.less';

type Props = {}

class BottomTabs extends React.PureComponent<Props, void> {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
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

export default BottomTabs;
