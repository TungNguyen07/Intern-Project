import React from "react";
import { Card, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  cardAction: {
    display: "flex"
  },
  card: {
    width: "45%",
    height: "100",
    marginTop: theme.spacing(2)
  }
}));

const CardItemComponent = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardAction}>
        {props.icon}
        {props.title}
      </CardActionArea>
    </Card>
  );
};

export default CardItemComponent;
