import './App.css';
import AppRoutes from './routes';
// theme
import { ThemeProvider } from '@material-ui/core';
import { PrimaryTheme } from './theme/theme';


// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider theme={PrimaryTheme}>
++      <AppRoutes />
    </ThemeProvider>
  );
}
