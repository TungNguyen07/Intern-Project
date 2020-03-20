import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: "1rem"
  },
  cardActionArea: {
    display: "flex",
    maxHeight: "200px",
    height: "200px"
  },
  media: {
    maxHeight: 140,
    maxWidth: 200,
    minHeight: 140,
    minWidth: 140,
    marginLeft: "1rem"
  },
  content: {
    textAlign: "left"
  }
}));

const CardPost = ({ post }) => {
  const classes = useStyles();
  //const [post, setPost] = useState();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia className={classes.media} image={post.cover_img} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardPost;
