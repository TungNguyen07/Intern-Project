import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import Header from "../components/Header/HeaderComponent";
import Dashboard from "../components/Admin/DashboardComponent";
import withAuth from "../middlewares/AuthHOC";

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

  return (
    <div>
      <Header title="Admin" />
      <Dashboard />
    </div>
  );
};

export default withAuth(Admin);
