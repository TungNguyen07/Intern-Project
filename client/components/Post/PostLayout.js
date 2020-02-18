import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavProfile from "../User/ProfileNavComponent";

import Nav from "../Layout/NavbarComponent";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const PostLayout = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs>
            <Paper className={classes.paper}>
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
