import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { fetchData } from "../../libs/fetchData";

const { SERVER_URL } = process.env;

const useStyles = makeStyles({
  content: {
    padding: 15,
    "& p": {
      textAlign: "start"
    },
    "& img": {
      margin: "auto",
      display: "flex",
      maxWidth: "100%"
    }
  },
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" },
  author: {
    textAlign: "end",
    fontWeight: "bold"
  },
  created_at: {
    textAlign: "start",
    marginLeft: 16
  },
  description: {
    textAlign: "start",
    fontWeight: "bold",
    padding: "0px 16px 0px 16px"
  },
  post: {
    color: "black",
    paddingRight: "1rem"
  }
});

const ReadPostComponent = () => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const post_id = localStorage.getItem("post_id");
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-post/${post_id}`).then(res => {
      if (!unmounted) {
        setPost(res.data);
        setFetching(false);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

  return fetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div className={classes.post}>
      <h1>{post.title}</h1>
      <p className={classes.created_at}>
        Created at: {new Date(post.created_at).toLocaleDateString()}
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

// const mapStateToProps = state => {
//   return {
//     post_id: state.postReducer.post_id
//   };
// };

export default ReadPostComponent;
