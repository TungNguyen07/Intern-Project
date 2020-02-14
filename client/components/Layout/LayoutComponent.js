import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import LeftLayout from "./LeftLayoutComponent";
import RightLayout from "./RightLayoutComponent";
import CenterLayout from "./CenterLayoutComponent";

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

const Layout = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <LeftLayout>{props.Left}</LeftLayout>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <CenterLayout>{props.Center}</CenterLayout>
            </Paper>
          </Grid>
          <Grid item xs>
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
