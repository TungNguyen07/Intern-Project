import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import LeftLayout from "./LeftLayoutComponent";
import RightLayout from "./RightLayoutComponent";
import CenterLayout from "./CenterLayoutComponent";

const paper = {
  padding: "9px",
  textAlign: "center",
  color: "#757575",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    ...paper,
  },
  sticky: {
    ...paper,
    position: "fixed",
    top: 0,
    width: "20%",
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const leftlayout = document.getElementById("leftlayout");
    let bannerHeight = leftlayout.offsetTop;
    let unmouted = false;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > bannerHeight * 1) {
        if (!unmouted) setSticky(true);
      } else {
        if (!unmouted) setSticky(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", scrollCallBack);
      unmouted = true;
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Paper
              id="leftlayout"
              className={isSticky ? classes.sticky : classes.paper}
            >
              <LeftLayout>{props.Left}</LeftLayout>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <CenterLayout>{props.Center}</CenterLayout>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <RightLayout>{props.Right}</RightLayout>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
