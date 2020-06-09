import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Router from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchData } from "../../libs/fetchData";
import CardPostItemHome from "./CardPostItemHomeComponent";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Container,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

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
  nothing: {
    margin: "auto",
    textAlign: "center",
    paddingBottom: "0.5rem",
  },
});

const RelativePostComponent = () => {
  const classes = useStyles();
  const [relative, setRelative] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const post_id = Router.query.post.split("-").slice(-1).pop();
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-relative-post/${post_id}`).then((res) => {
      if (!unmounted) {
        setRelative(res.data.relativePost);
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
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={9} className={classes.root}>
          <Paper>
            <Typography className={classes.title} variant="h5">
              Bài viết liên quan
            </Typography>
            {relative.length ? (
              <div>
                <CardPostItemHome post={relative[0]} />
                <CardPostItemHome post={relative[1]} />
              </div>
            ) : (
              <h4 className={classes.nothing}>Nothing found!</h4>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RelativePostComponent;
