import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchData } from "../../libs/fetchData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
import { titleToURL } from "../../libs/changeTitleToURL";
import { getPost } from "../../actions/postActions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  hr: {
    width: "80%",
  },
  cardImage: {
    borderRadius: 5,
    width: "90%",
    height: "13rem",
    "@media (min-width:600px)": {
      height: "9rem",
    },
    [theme.breakpoints.up("md")]: {
      height: "13rem",
    },
  },
  cardItem: {
    width: "30%",
    margin: "2% 1% 1% 2%",
    "& p": {
      textAlign: "start",
    },
  },
  title: {
    paddingTop: "1rem",
    display: "inline-flex",
    fontSize: "1.6rem",
    "@media (min-width:600px)": {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.6rem",
    },
  },
  icon: {
    fontSize: "2.5rem",
    marginBottom: "-0.5rem",
    marginLeft: theme.spacing(1),

    "@media (min-width:600px)": {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
  },
  link: {
    "&:visited": {
      color: "inherit",
    },
  },
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  postTitle: {
    fontSize: "1.3rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3rem",
    },
  },
  description: {
    "@media (min-width:600px)": {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.875rem",
    },
  },
}));

export const UserPostComponent = ({ user, getPost }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    let unmounted = false;
    if (user.id) {
      fetchData(`${SERVER_URL}/post/get-post-by-user/${user.id}`).then(
        (res) => {
          if (!unmounted) {
            setPost(
              res.data.map((item) => {
                return {
                  cover_img: item.cover_img,
                  title: item.title,
                  description:
                    item.description.length > 100
                      ? item.description.slice(0, 100) + "..."
                      : item.description,
                  _id: item._id,
                };
              })
            );
            setFetching(false);
          }
        }
      );
    }

    return () => {
      unmounted = true;
    };
  }, [user]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Paper className={classes.root}>
        <h1 className={classes.title}>{user.fullname}'s Post</h1>
        <Link href="/create-post">
          <a className={classes.link}>
            <PostAddIcon className={classes.icon} />
          </a>
        </Link>
        <hr className={classes.hr} />
        <div>
          <Grid container spacing={0}>
            {post.map((item) => {
              return (
                <Link
                  href="/post/[post]"
                  as={`/post/${titleToURL(item.title)}`}
                  key={item._id}
                >
                  <CardActionArea
                    className={classes.cardItem}
                    onClick={getPost(item._id)}
                  >
                    <img className={classes.cardImage} src={item.cover_img} />
                    <CardContent>
                      <Typography
                        className={classes.postTitle}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        className={classes.description}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              );
            })}
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: bindActionCreators(getPost, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPostComponent);
