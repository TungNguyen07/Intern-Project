import React, { useState, useEffect } from "react";
import { Paper, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import ManageComponent from "../components/Admin/ManageComponent";
import Header from "../components/Header/HeaderComponent";
import AdminInfo from "../components/Admin/AdminInfoComponent";
import Avatar from "../components/User/AvatarComponent";

const useStyles = makeStyles(theme => ({
  top: {
    padding: theme.spacing(2),
    backgroundColor: "#e0e0e0"
  },
  paper: {
    marginTop: theme.spacing(2)
  },
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const Admin = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return isLoading ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Header title="Admin" />
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <Paper className={classes.top}>
            <Paper>
              <AdminInfo />
            </Paper>
            <Paper className={classes.paper}>
              <ManageComponent />
            </Paper>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Admin;
