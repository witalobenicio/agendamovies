import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#585858',
      main: '#3b3b3b',
      dark: '#1d1d1d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffc300',
      main: '#ff9800',
      dark: '#c37400',
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
