import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";

import CardPostItem from "./CardPostItemComponent";
import { fetchData } from "../../libs/fetchData";
import Router from "next/router";
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
    margin: "0px 0px 16px 8px",
    fontSize: "1.25rem",
    "@media (min-width:600px)": {
      fontSize: "0.750rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
    },
  },
  pagination: {
    width: "fit-content",
    margin: "auto",
  },
}));

const ActivityPostComponent = ({ setTitleActivity, activity_id }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [title, setTitle] = useState("");
  const [length, setLength] = useState(1);
  const [initPage, setPage] = useState(1);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    let unmounted = false;
    const name = Router.asPath.split("/").slice(-1).pop();
    if (name != current) {
      setCurrent(name);
      setPage(1);
    }

    fetchData(`${SERVER_URL}/activity/${name}/${initPage}`).then((res) => {
      if (!unmounted) {
        setPost(
          res.data.activity_post.map((item) => {
            return {
              cover_img: item.cover_img,
              title: item.title,
              description:
                item.description.length > 150
                  ? item.description.slice(0, 150) + "..."
                  : item.description,
              _id: item._id,
            };
          })
        );
        setLength(res.data.count);
        setTitle(res.data.activity);
        setTitleActivity(res.data.activity);
      }
      setFetching(false);
    });

    return () => {
      unmounted = true;
    };
  }, [activity_id, initPage]);

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
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      {post.length ? (
        post.map((item) => (
          <CardPostItem className={classes.card} key={item._id} post={item} />
        ))
      ) : (
        <h4>Nothing found!</h4>
      )}
      <Pagination
        className={classes.pagination}
        count={length}
        showFirstButton
        showLastButton
        onChange={handleChange}
        page={initPage}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { activity_id: state.activityReducer.activity_id };
};

export default connect(mapStateToProps, null)(ActivityPostComponent);
