import React from "react";
import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    width: "70%",
    margin: "auto",
  },
  data: {
    textAlign: "start",
    width: "80%",
  },
  title: {
    fontSize: "0.875rem",
    "@media (min-width:600px)": {
      fontSize: "0.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.875rem",
    },
  },
  quantity: {
    fontSize: "1.5rem",
    "@media (min-width:600px)": {
      fontSize: "0.875rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
}));

const CardItemComponent = (props) => {
  const classes = useStyles();
  return (
    <Card style={props.style}>
      <div className={classes.content}>
        <div className={classes.data}>
          <Typography className={classes.title}>{props.title}</Typography>
          <Typography className={classes.quantity}>{props.quantity}</Typography>
        </div>
        {props.icon}
      </div>
    </Card>
  );
};

export default CardItemComponent;
