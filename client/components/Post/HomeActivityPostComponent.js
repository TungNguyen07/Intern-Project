import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Link from "next/link";

import CardPostItemHome from "./CardPostItemHomeComponent";
import { fetchData } from "../../libs/fetchData";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  card: { marginTop: theme.spacing(1) },
  title: {
    color: "black",
    textAlign: "start",
    cursor: "pointer",
    width: "fit-content",
    fontSize: "1.25rem",
    "@media (min-width:600px)": {
      fontSize: "0.875rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
    },
  },
  pagination: {
    width: "fit-content",
    margin: "auto",
  },
  span: {
    margin: "0px 8px 8px 8px",
    background: "linear-gradient(#a3f1ff,#03c8ff)",
    padding: "3px 0px 0px 8px",
    borderRadius: "4px",
    display: "block",
  },
}));

const HomeActivityPostComponent = ({ name, id }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    let unmounted = false;
    if (id) {
      fetchData(`${SERVER_URL}/post/get-post-by-activity/${id}`).then((res) => {
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

          // setLength(res.data.count);
        }
        setFetching(false);
      });
    }

    return () => {
      unmounted = true;
    };
  }, [id]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : post.length >= 2 ? (
    <div>
      <Link
        href="/activity/[activity_name]"
        as={`/activity/${name.toLowerCase()}`}
      >
        <span className={classes.span}>
          <Typography className={classes.title} variant="h6">
            {name}
          </Typography>
        </span>
      </Link>
      {post.map((item) => (
        <CardPostItemHome className={classes.card} key={item._id} post={item} />
      ))}
    </div>
  ) : (
    <div />
  );
};

export default HomeActivityPostComponent;
