import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import { connect } from "react-redux";

import { fetchData } from "../../libs/fetchData";
const { SERVER_URL } = process.env;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  },
  hr: {
    width: "80%"
  },
  cardImage: {
    borderRadius: 5
  },
  cardItem: {
    margin: "auto",
    marginTop: theme.spacing(2)
  },
  title: {
    paddingTop: "1rem",
    display: "inline-flex"
  },
  icon: {
    fontSize: "2.5rem",
    marginBottom: "-0.5rem",
    marginLeft: theme.spacing(1)
  },
  link: {
    "&:visited": {
      color: "inherit"
    }
  },
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

export const UserPostComponent = ({ user }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    fetchData(`${SERVER_URL}/post/get-post-by-user?id=${user.id}`).then(res => {
      setPost(
        res.data.map(item => {
          return {
            cover_img: item.cover_img,
            title: item.title,
            description:
              item.description.length > 200
                ? item.description.slice(0, 200) + "..."
                : item.description,
            _id: item._id
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    setFetching(false);
    console.log(post, user);
  }, [post]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Paper className={classes.root}>
        <h1 className={classes.title}>{user.fullname}'s' Post</h1>
        <Link href="/create-post">
          <a className={classes.link}>
            <PostAddIcon className={classes.icon} />
          </a>
        </Link>
        <hr className={classes.hr} />
        <div>
          {post.map(item => {
            <Grid container spacing={0}>
              <Grid item xs={3} className={classes.cardItem}>
                <CardActionArea>
                  <CardMedia
                    className={classes.cardImage}
                    component="img"
                    height="140"
                    image={item.cover_img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                ;
              </Grid>
            </Grid>;
          })}
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps, null)(UserPostComponent);
