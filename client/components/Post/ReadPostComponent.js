import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

import { fetchData } from "../../libs/fetchData";
import Router from "next/router";
import { connect } from "react-redux";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles({
  content: {
    padding: 15,
    "& p": {
      textAlign: "start",
    },
    "& img": {
      margin: "auto",
      display: "flex",
      maxWidth: "100%",
    },
    fontSize: "1rem",
  },
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  author: {
    textAlign: "end",
    fontWeight: "bold",
  },
  created_at: {
    textAlign: "start",
    marginLeft: 16,
  },
  description: {
    textAlign: "start",
    fontWeight: "bold",
    padding: "0px 16px 0px 16px",
    fontSize: "1rem",
  },
  post: {
    color: "black",
    padding: "0rem 4rem",
  },
  title: {
    fontSize: "1.5rem",
  },
  icon: {
    fontSize: "1rem",
    margin: "0 0.2rem -0.2rem 1rem",
  },
});

const ReadPostComponent = ({ setTitle, postId }) => {
  const classes = useStyles();
  const [post, setPost] = useState({});
  const [fetching, setFetching] = useState(true);

  // useEffect(() => {
  //   const post_id = Router.query.post.split("-").slice(-1).pop();
  //   let unmounted = false;
  //   fetchData(`${SERVER_URL}/post/get-post/${post_id}`).then((res) => {
  //     if (!unmounted) {
  //       setPost(res.data);
  //       setFetching(false);
  //       setTitle(res.data.title);
  //     }
  //   });

  //   return () => {
  //     unmounted = true;
  //   };
  // }, []);

  useEffect(() => {
    const id = Router.asPath.split("-").pop();

    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-post/${postId || id}`).then((res) => {
      if (!unmounted) {
        setPost(res.data);
        setFetching(false);
        setTitle(res.data.title);
      }
    });

    return () => {
      unmounted = true;
    };
  }, [postId]);

  return fetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div className={classes.post}>
      <h1 className={classes.title}>{post.title}</h1>
      <p className={classes.created_at}>
        <QueryBuilderIcon className={classes.icon} />
        {new Date(post.created_at).toLocaleString()}
        {""}
        <VisibilityIcon className={classes.icon} />
        {post.view}
      </p>
      <p className={classes.description}>{post.description}</p>
      <div
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <p className={classes.author}>{post.fullname}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    postId: state.postReducer.post_id,
  };
};

export default connect(mapStateToProps, null)(ReadPostComponent);
