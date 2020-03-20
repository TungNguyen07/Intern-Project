import React from "react";
import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    width: "70%",
    margin: "auto"
  },
  data: {
    textAlign: "start",
    width: "80%"
  },
  title: {
    fontSize: "0.750rem"
  }
}));

const CardItemComponent = props => {
  const classes = useStyles();
  return (
    <Card style={props.style}>
      <div className={classes.content}>
        <div className={classes.data}>
          <Typography variant="subtitle2" className={classes.title}>
            {props.title}
          </Typography>
          <Typography variant="h5">{props.quantity}</Typography>
        </div>
        {props.icon}
      </div>
    </Card>
  );
};

export default CardItemComponent;
