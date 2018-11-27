/* eslint-disable jsx-a11y/anchor-is-valid,import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compose } from 'recompose';
import Immutable from 'immutable';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import { Image } from '~/components';

import search, { success, SEARCH_MOVIES_SUCCESS } from '~/store/searchMovies/action';

import style from './Header.less';
import logo from '!file-loader?name=[name].[ext]!../../assets/img/logo.png';

type Props = {
  cart: any,
  history: any,
};

function renderInputComponent(inputProps) {
  const { inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <InputBase
      placeholder="Buscar filmes..."
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
      }}
      {...other}
      className={style.searchInput}
    />
  );
}

class Header extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      single: '',
      suggestions: [],
    };

    this.getMoviesAsync = _.debounce(this.getMovies, 500);
  }

  componentWillReceiveProps({ searchMovies }) {
    (() => {
      if (searchMovies.type === this.props.searchMovies.type) return;
      if (searchMovies.type !== SEARCH_MOVIES_SUCCESS) return;
      this.setState({ suggestions: searchMovies.payload.results });
    })();
  }

  getMovies = () => {
    const { single } = this.state;
    this.props.dispatch(search(single));
  };


  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({ single: value }, () => {
      this.getMoviesAsync();
    });
  };

  handleSuggestionsClearRequested = () => {
    this.props.dispatch(success([]));
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const { history } = this.props;

    return (
      <MenuItem
        onClick={() => { history.replace(`/movies/${suggestion.id}`); }}
        className={style.suggestionItem}
        selected={isHighlighted}
        component="div"
      >
        <div>
          <Image className={style.suggestionImage} src={suggestion.poster_path} />
          <div className={style.movieName}>
            <span>{suggestion.title}</span>
          </div>
        </div>
      </MenuItem>
    );
  };

  render() {
    const autosuggestProps = {
      renderInputComponent,
      onSuggestionClick: () => {},
      suggestions: this.state.suggestions || [],
      getSuggestionValue: () => '',
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      renderSuggestion: this.renderSuggestion,
      focusInputOnSuggestionClick: false,
    };

    return (
      <AppBar position="static" color="primary">
        <div className={style.headerContent}>
          <Toolbar className={style.header}>
            <Typography className={style.title} variant="h6" color="inherit" noWrap>
              <Link to="/">
                <img className={style.logo} src={logo} />
              </Link>
            </Typography>
            <div className={style.rightContent}>
              <div className={style.searchContainer}>
                <SearchIcon className={style.searchIcon} />
                <Autosuggest
                  {...autosuggestProps}
                  inputProps={{
                    value: this.state.single,
                    onChange: this.handleChange('single'),
                  }}
                  renderSuggestionsContainer={options => (
                    <Paper
                      {...options.containerProps}
                      square
                      className={style.suggestionsContainer}
                    >
                      {options.children}
                    </Paper>
                  )}
                />
              </div>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getSearchResults = createImmutableSelector([state => state], state =>
  state.getIn(['searchMovies']).toJS());

function mapStateToProps(state) {
  return {
    searchMovies: getSearchResults(state),
  };
}

export default compose(connect(mapStateToProps), withRouter)(Header);
