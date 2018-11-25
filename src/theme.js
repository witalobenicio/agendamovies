import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#191919',
      dark: '#020202',
      contrastText: '#fff',
    },
    secondary: {
      light: '#c56cff',
      main: '#883cc3',
      dark: '#532577',
      contrastText: '#fff',
    },
    danger: {
      light: '#ff2f3e',
      main: '#c50000',
      dark: '#8a0300',
      contrastText: '#fff',
    },
  },
  status: {
    danger: 'red',
    warning: 'orange',
  },
});

export default theme;
