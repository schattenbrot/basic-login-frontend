import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { useMemo } from 'react';
import Layout from '../components/layout/layout';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
