import NextApp from "next/app";
import React, { useReducer } from "react";
import { UserProvider } from "../contexts/userContext";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const theme = {
  primary: "#f2f2f2",
  ...createMuiTheme()
};

export default class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <StyledThemeProvider theme={theme}>
        <MaterialThemeProvider theme={theme}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </MaterialThemeProvider>
      </StyledThemeProvider>
    );
  }
}
