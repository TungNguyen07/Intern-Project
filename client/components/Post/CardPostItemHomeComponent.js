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

const useStyles = makeStyles(theme => ({
  root: {
    width: "48%",
    marginBottom: "1rem",
    display: "inline-flex",
    margin: "0 1% 1rem 1%",
    color: "black"
  },
  cardActionArea: {
    maxHeight: "200px",
    height: "140px"
  },
  media: {
    maxWidth: "30%",
    float: "left",
    margin: "0.5rem 0.5rem 0.1rem 1rem"
  },
  content: {
    textAlign: "left"
  },
  title: {
    lineHeight: "1.3",
    marginTop: -theme.spacing(1),
    fontSize: "0.9rem"
  }
}));

const CardPost = ({ post, getPost }) => {
  const classes = useStyles();
  //const [post, setPost] = useState();

  const handleClick = () => {
    getPost(post._id, post.title);
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
            <Typography variant="body2" color="textSecondary" component="p">
              {post.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: bindActionCreators(getPost, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(CardPost);
