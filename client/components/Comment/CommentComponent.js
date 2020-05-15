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

const useStyles = makeStyles({
  loading: {
    marginTop: "15%",
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

const CommentComponent = ({ post_id }) => {
  const classes = useStyles();
  const [fetching, setFetching] = useState(true);
  const [comment, setComment] = useState([]);
  const [length, setLength] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (post_id) {
      let unmouted = false;

      fetchData(
        `${SERVER_URL}/comment/get-comment-by-post-id/${post_id}/${page}`
      ).then((res) => {
        if (!unmouted) {
          setComment(res.data.comment);
          setLength(res.data.count);
          setFetching(false);
        }
      });
      return () => {
        unmouted = true;
      };
    }
  }, [page, post_id]);

  const handleChange = (event, pageClick) => {
    const cmtBlock = document.getElementById("comment");
    cmtBlock.scrollIntoView({ behavior: "smooth" });
    setPage(pageClick);
  };

  const handleComment = (info) => {
    let unmouted = false;
    postData(`${SERVER_URL}/comment/post-comment`, info).then((res) => {
      if (!unmouted) {
        setComment(
          [...comment, res.cmt].sort((item1, item2) => {
            return new Date(item2.created_at) - new Date(item1.created_at);
          })
        );
      }
    });
    return () => {
      unmouted = true;
    };
  };

  return fetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={3} />
        <Grid id="comment" item xs={9} className={classes.root}>
          <Paper>
            <Typography className={classes.title} variant="h5">
              Comment
            </Typography>
            <CommentForm action={handleComment} />
            {comment.length ? (
              comment.map((item, index) => {
                return <UserCommment key={index} comment={item} />;
              })
            ) : (
              <div />
            )}
            <div className={classes.pagination}>
              <Pagination
                count={length}
                showFirstButton
                showLastButton
                onChange={handleChange}
                page={page}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommentComponent;
