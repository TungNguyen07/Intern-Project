import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Link from "next/link";

import CardPostItem from "./CardPostItemComponent";
import { fetchData } from "../../libs/fetchData";
import HomeActivityPostComponent from "./HomeActivityPostComponent";

const { SERVER_URL } = process.env;

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" },
  card: { marginTop: theme.spacing(1) },
  title: {
    color: "black",
    textAlign: "start",
    cursor: "pointer",
    width: "fit-content"
  },
  pagination: {
    width: "fit-content",
    margin: "auto"
  },
  span: {
    margin: "0px 8px 8px 8px",
    background: "linear-gradient(#a3f1ff,#03c8ff)",
    padding: "3px 0px 0px 8px",
    borderRadius: "4px",
    display: "block"
  }
}));

const HomePagePostComponent = () => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-some-post`).then(res => {
      if (!unmounted) {
        setPost(
          res.data.somePost.map(item => {
            return {
              cover_img: item.cover_img,
              title: item.title,
              description:
                item.description.length > 100
                  ? item.description.slice(0, 100) + "..."
                  : item.description,
              _id: item._id
            };
          })
        );
        setActivityList(res.data.activityList);
        // setLength(res.data.count);
      }
      setFetching(false);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      unmounted = true;
    };
  }, []);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Link href="/newest-activity">
        <span className={classes.span}>
          <Typography className={classes.title} variant="h6">
            NEWEST ACTIVITY
          </Typography>
        </span>
      </Link>
      {post.map(item => (
        <CardPostItem className={classes.card} key={item._id} post={item} />
      ))}
      {activityList.map(item => {
        return (
          <HomeActivityPostComponent
            key={item._id}
            name={item.activity_name}
            id={item._id}
          />
        );
      })}
    </div>
  );
};

export default HomePagePostComponent;
