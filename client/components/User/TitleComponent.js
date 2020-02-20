import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
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
    display: "flex",
    marginBottom: "-1rem"
  },
  title: {
    margin: "auto",
    paddingTop: "1rem"
  },
  button: {
    position: "absolute"
  }
}));

const TitleComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.top}>
      <Link href="/">
        <IconButton
          color="primary"
          aria-label="Edit"
          component="span"
          className={classes.button}
        >
          <ArrowBackIcon className={classes.icon} />
        </IconButton>
      </Link>
      <h1 className={classes.title}>User Profile</h1>
    </div>
  );
};

export default TitleComponent;
