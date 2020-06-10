import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Router from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "@material-ui/lab/Pagination";

import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Container, Avatar } from "@material-ui/core";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
import CommentForm from "./CommentFormComponent";
import UserCommment from "./UserCommentComponent";
import { postData } from "../../libs/postData";
import { fetchData } from "../../libs/fetchData";
import MessageDialog from "../Dialog/MessageDialogComponent";
import { connect } from "react-redux";

const useStyles = makeStyles({
  loading: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  div: { textAlign: "center" },
  root: {
    marginTop: "1rem",
  },
  title: {
    marginBottom: "0.5rem",
    padding: "0.3rem 1rem",
    backgroundColor: "#4fd9ff",
    borderRadius: "4px 4px 0 0",
  },
  pagination: {
    width: "fit-content",
    margin: "auto",
    paddingBottom: "0.5rem",
  },
});

const CommentComponent = ({ postId }) => {
  const classes = useStyles();
  const [fetching, setFetching] = useState(true);
  const [comment, setComment] = useState([]);
  const [length, setLength] = useState(1);
  const [page, setPage] = useState(1);
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    let unmouted = false;
    const id = Router.asPath.split("-").pop();
    fetchData(
      `${SERVER_URL}/comment/get-comment-by-post-id/${id}/${page}`
    ).then((res) => {
      if (!unmouted) {
        if (res.data) {
          setComment(res.data.comment);
          setLength(res.data.count);
          setFetching(false);
        }
      }
    });
    return () => {
      unmouted = true;
    };
  }, [page]);

  const handleChange = (event, pageClick) => {
    const cmtBlock = document.getElementById("comment");
    cmtBlock.scrollIntoView({ behavior: "smooth" });
    setPage(pageClick);
  };

  const handleComment = (info) => {
    let unmouted = false;
    postData(`${SERVER_URL}/comment/post-comment`, info).then((res) => {
      if (!unmouted) {
        if (res.success)
          setComment(
            [...comment, res.cmt].sort((item1, item2) => {
              return new Date(item2.created_at) - new Date(item1.created_at);
            })
          );
        else {
          setDisplay(true);
          setMessage(["Bình luận thất bại!"]);
        }
      }
    });
    return () => {
      unmouted = true;
    };
  };

  useEffect(() => {
    const id = Router.asPath.split("-").pop();
    let unmouted = false;
    fetchData(
      `${SERVER_URL}/comment/get-comment-by-post-id/${postId || id}/${page}`
    ).then((res) => {
      if (!unmouted) {
        if (res.data) {
          setComment(res.data.comment);
          setLength(res.data.count);
          setFetching(false);
        }
      }
    });
    return () => {
      unmouted = true;
    };
  }, [postId]);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={3} />
        <Grid id="comment" item xs={9} className={classes.root}>
          <Paper>
            <Typography className={classes.title} variant="h5">
              Bình luận
            </Typography>
            <CommentForm action={handleComment} />
            {fetching ? (
              <div className={classes.div}>
                <CircularProgress className={classes.loading} />
              </div>
            ) : (
              <div>
                {comment.length ? (
                  comment.map((item, index) => {
                    return <UserCommment key={index} comment={item} />;
                  })
                ) : (
                  <div />
                )}
                {comment.length ? (
                  <div className={classes.pagination}>
                    <Pagination
                      count={length}
                      showFirstButton
                      showLastButton
                      onChange={handleChange}
                      page={page}
                    />
                  </div>
                ) : (
                  <div />
                )}
              </div>
            )}
            {display && <MessageDialog setError={display} message={message} />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    postId: state.postReducer.post_id,
  };
};

export default connect(mapStateToProps, null)(CommentComponent);
