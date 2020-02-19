import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  paper: {}
}));

const CardItemComponent = props => {
  const classes = useStyles();
  return (
    <div>
      <Paper>{props.children}</Paper>
    </div>
  );
};

export default CardItemComponent;
