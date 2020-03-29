import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import ManageUser from "./ManageUserComponent";
import ManageActivity from "./ManageActivityComponent";
import ManagePost from "./ManagePostComponent";
import ManagePendingPost from "./ManagePendingPostComponent";
import ChangeBannerComponent from "./ChangeBannerComponent";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  grid: {
    display: "flex",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  div: {
    width: "100%"
  }
}));

const ManageComponent = ({ tableDisplay }) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(<ChangeBannerComponent />);

  useEffect(() => {
    switch (tableDisplay) {
      case "USER":
        return setDisplay(<ManageUser />);
      case "POST":
        return setDisplay(<ManagePost />);
      case "ACTIVITY":
        return setDisplay(<ManageActivity />);
      case "PENDING_POST":
        return setDisplay(<ManagePendingPost />);
      case "BANNER":
        return setDisplay(<ChangeBannerComponent />);
      default:
        return;
    }
  }, [tableDisplay]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container item xs={12} className={classes.grid}>
          <div className={classes.div}>{display}</div>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ManageComponent;
