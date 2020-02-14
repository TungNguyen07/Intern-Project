import React from "react";
import Link from "next/link";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

const Propaganda = () => {
  const classes = useStyles();
  return (
    <div>
      <Link href="#">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
              title="#"
            />
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default Propaganda;
