import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import CardPostItem from "./CardPostItemComponent";
import { fetchData } from "../../libs/fetchData";
const { SERVER_URL } = process.env;

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" },
  card: { marginTop: theme.spacing(1) }
}));

const LatestPostComponent = () => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    fetchData(`${SERVER_URL}/post/get-some-post`).then(res => {
      setPost(
        res.data.map(item => {
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
      setFetching(false);
    });
  }, []);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      {post.map(item => (
        <CardPostItem className={classes.card} key={item._id} post={item} />
      ))}
    </div>
  );
};

export default LatestPostComponent;
