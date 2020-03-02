import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Title from "./TitleComponent";
import Avatar from "./AvatarComponent";
import Info from "./InfoComponent";

const useStyles = makeStyles(theme => ({
  hr: {
    width: "80%"
  },
  displayInfo: {
    display: "flex"
  }
}));

const ProfileComponent = () => {
  const classes = useStyles();

  return (
    <Paper>
      <Title />
      <br />
      <hr className={classes.hr} />
      <div className={classes.displayInfo}>
        <Avatar />
        <Info />
      </div>
    </Paper>
  );
};

export default ProfileComponent;
