import NextApp from "next/app";
import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import withRedux from "next-redux-wrapper";
import NextNprogress from "nextjs-progressbar";
const dotenv = require("dotenv");
dotenv.config();

import allReducer from "../stores/allReducer";

const store = createStore(
  allReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const makeStore = () => store;

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const theme = {
  primary: "#f2f2f2",
  ...createMuiTheme()
};

class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const { store } = ctx || {};
    return { pageProps, store };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <StyledThemeProvider theme={theme}>
        <MaterialThemeProvider theme={theme}>
          <Provider store={store}>
            <NextNprogress color="#10649c" />
            <Component {...pageProps} />
          </Provider>
        </MaterialThemeProvider>
      </StyledThemeProvider>
    );
  }
}

export default withRedux(makeStore)(App);
