import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Link from "next/link";

import CardPostItem from "./CardPostItemComponent";
import { fetchData } from "../../libs/fetchData";
import HomeActivityPostComponent from "./HomeActivityPostComponent";

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
  pagination: {
    width: "fit-content",
    margin: "auto",
  },
}));

const LatestPostComponent = () => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [length, setLength] = useState(1);
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-newest-post/${currentPage}`).then(
      (res) => {
        if (!unmounted) {
          setPost(
            res.data.post.map((item) => {
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

          setLength(res.data.length);
        }
        setFetching(false);
      }
    );

    return () => {
      unmounted = true;
    };
  }, [currentPage]);

  const handleChange = (event, page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <span className={classes.span}>
        <Typography className={classes.title} variant="h6">
          NEWEST ACTIVITY
        </Typography>
      </span>

      {post.map((item) => (
        <CardPostItem className={classes.card} key={item._id} post={item} />
      ))}
      <div className={classes.pagination}>
        <Pagination
          count={length}
          showFirstButton
          showLastButton
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default LatestPostComponent;
