import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import CardPostItem from "./CardPostItemComponent";
import { fetchData } from "../../libs/fetchData";

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
    margin: "0px 0px 16px 8px"
  },
  pagination: {
    width: "fit-content",
    margin: "auto"
  }
}));

const LatestPostComponent = () => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [length, setLength] = useState(1);
  const [initPage, setPage] = useState(1);

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-some-post/${initPage}`).then(res => {
      if (!unmounted) {
        setPost(
          res.data.somePost.map(item => {
            return {
              cover_img: item.cover_img,
              title: item.title,
              description:
                item.description.length > 200
                  ? item.description.slice(0, 200) + "..."
                  : item.description,
              _id: item._id
            };
          })
        );

        setLength(res.data.count);
      }
      setFetching(false);
    });
    return () => {
      unmounted = true;
    };
  }, [initPage]);

  const handleChange = (event, page) => {
    setPage(page);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Typography className={classes.title} variant="h5">
        NEWEST ACTIVITY
      </Typography>
      {post.map(item => (
        <CardPostItem className={classes.card} key={item._id} post={item} />
      ))}
      <Pagination
        className={classes.pagination}
        count={length}
        showFirstButton
        showLastButton
        onChange={handleChange}
      />
    </div>
  );
};

export default LatestPostComponent;
