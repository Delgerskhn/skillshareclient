import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import createCache from "@emotion/cache";
import theme from "../src/theme";
import "../styles/app.css";
import Layout from "../shared/layout";
import { AppProvider, useAppContext } from "../context/app";
import Loader from "../components/loader";
import AuthLayout from "../shared/auth-layout";
import { AuthProvider } from "../context/auth";
import { EditorProvider } from "../context/editor";
import { pageContextMapper } from "../helpers/page-context-mapper";

export const cache = createCache({ key: "css", prepend: true });

export default function MyApp(props) {
  const { Component, pageProps, router } = props;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const PageContextMapper = pageContextMapper(router.pathname, Component)
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppProvider>
          <AuthProvider>
            <Loader />
            <PageContextMapper pageProps={pageProps} />
          </AuthProvider>
        </AppProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};
