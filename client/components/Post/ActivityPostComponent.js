import React from "react";
import CardPostItem from "./CardPostItemComponent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    color: "black",
    display: "flex",
    margin: 0
  },
  hr: {
    width: "90%",
    marginBottom: theme.spacing(2)
  }
}));

const ActivityPostComponent = () => {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.title}>Activity</h1>
      <hr className={classes.hr} />
      <CardPostItem />
    </div>
  );
};

export default ActivityPostComponent;
