import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { titleToURL } from "../../libs/changeTitleToURL";
import { getPost } from "../../actions/postActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "1rem",
    color: "black",
  },
  cardActionArea: {
    display: "flex",
    height: "9rem",
    justifyContent: "start",
  },
  media: {
    maxHeight: "8rem",
    maxWidth: "13rem",
    marginLeft: "1rem",
    "@media (min-width:600px)": {
      maxHeight: "5rem",
      maxWidth: "8rem",
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "8rem",
      maxWidth: "13rem",
    },
  },
  content: {
    textAlign: "left",
  },
  title: {
    lineHeight: "inherit",
    fontSize: "1rem",
    "@media (min-width:600px)": {
      fontSize: "0.750rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
    },
  },
  description: {
    fontSize: "0.875rem",
    "@media (min-width:600px)": {
      fontSize: "0.650rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.875rem",
    },
  },
}));

const CardPost = ({ post, getPost }) => {
  const classes = useStyles();
  //const [post, setPost] = useState();

  const handleClick = () => {
    getPost(post._id);
  };

  return (
    <Card className={classes.root}>
      <Link href="/post/[post]" as={`/post/${titleToURL(post.title)}`}>
        <CardActionArea
          className={classes.cardActionArea}
          onClick={handleClick}
        >
          <img className={classes.media} src={post.cover_img} />
          <CardContent className={classes.content}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="subtitle1"
              component="h6"
            >
              {post.title}
            </Typography>
            <Typography
              className={classes.description}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {post.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: bindActionCreators(getPost, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(CardPost);
