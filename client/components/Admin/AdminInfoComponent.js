import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "../User/AvatarComponent";
import Info from "../User/InfoComponent";

const useStyles = makeStyles(theme => ({
  hr: { width: "80%" },
  displayInfo: { display: "flex" },
  title: { margin: "auto", textAlign: "center", paddingTop: theme.spacing(1) }
}));

const AdminInfoComponent = () => {
  const classes = useStyles();
  return (
    <Paper>
      <h1 className={classes.title}>Admin Info</h1>
      <hr className={classes.hr} />
      <div className={classes.displayInfo}>
        <Avatar />
        <Info />
      </div>
    </Paper>
  );
};

export default AdminInfoComponent;
