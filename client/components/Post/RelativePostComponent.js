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
} from "@material-ui/core";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  paper: {
    marginTop: "0.5rem",
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

  useEffect(() => {
    console.log(relative);
  }, [relative]);

  return fetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              {relative.length &&
                relative.map((item) => {
                  <CardActionArea>
                    <img src={item.cover_img} />
                    <CardContent>
                      <Typography>{item.title}</Typography>
                      <p>{item.discription}</p>
                    </CardContent>
                  </CardActionArea>;
                })}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default RelativePostComponent;
