import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavProfile from "../User/ProfileNavComponent";

import Nav from "../Layout/NavbarComponent";

const paper = {
  padding: "8px",
  textAlign: "center",
  color: "#757575"
};

const useStyles = makeStyles(theme => ({
  paper: {
    ...paper
  },
  sticky: {
    ...paper,
    position: "fixed",
    top: 0,
    width: "20%"
  }
}));

const PostLayout = props => {
  const classes = useStyles();
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const leftlayout = document.getElementById("leftlayout");
    let bannerHeight = leftlayout.offsetTop;
    let unmounted = false;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > bannerHeight * 1) {
        if (!unmounted) setSticky(true);
      } else {
        if (!unmounted) setSticky(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
      unmounted = true;
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs>
            <Paper
              id="leftlayout"
              className={isSticky ? classes.sticky : classes.paper}
            >
              <Nav />
              <br />
              <NavProfile />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>{props.Right}</Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default PostLayout;
