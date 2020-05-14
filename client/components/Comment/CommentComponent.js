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

const CommentComponent = () => {
  const classes = useStyles();
  const [fetching, setFetching] = useState(false);
  const [comment, setComment] = useState([
    {
      _id: "adjjadjad",
      owner: "Tung",
      comment: "abcxyz",
      created_at: "03:11:22",
      reply: [],
    },
    {
      _id: "ahdjjadhjahd",
      owner: "Dung",
      comment: "abcxyz",
      created_at: "03:11:22",
      reply: [],
    },
    {
      _id: "vahavshavsha",
      owner: "Hung",
      comment: "abcxyz",
      created_at: "03:11:22",
      reply: [],
    },
  ]);

  const handleComment = (info) => {
    postData(`${SERVER_URL}/comment/post-comment`, info).then((res) => {
      console.log(res);
    });
    setComment([...comment, info]);
  };

  return fetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={9} className={classes.root}>
          <Paper>
            <Typography className={classes.title} variant="h5">
              Comment
            </Typography>
            <CommentForm action={handleComment} />
            {comment.length &&
              comment.map((item) => {
                return <UserCommment key={item._id} comment={item} />;
              })}
            <div className={classes.pagination}>
              <Pagination showFirstButton showLastButton />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommentComponent;
