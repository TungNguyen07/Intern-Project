import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(21),
    height: theme.spacing(21),
    marginTop: theme.spacing(3),
    marginLeft: "15%"
  },
  root: {
    marginTop: theme.spacing(4)
  },

  icon: {
    fontSize: "3rem"
  },
  radio: {
    fontSize: "1em"
  },
  icon: {
    fontSize: "3rem"
  },
  top: {
    display: "flex"
  },
  title: {
    margin: "auto"
  },
  button: {
    position: "absolute"
  }
}));

const AvatarComponent = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Avatar
        alt="image"
        src="https://material-ui.com/static/images/avatar/1.jpg"
        className={classes.large}
      />
    </React.Fragment>
  );
};
export default AvatarComponent;
