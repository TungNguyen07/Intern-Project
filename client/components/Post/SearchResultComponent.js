import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import CardPostItem from "./CardPostItemComponent";
import { fetchData } from "../../libs/fetchData";
import { connect } from "react-redux";
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

const SearchResultComponent = ({ query }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [title, setTitle] = useState("");
  const [length, setLength] = useState(1);
  const [initPage, setPage] = useState(1);

  useEffect(() => {
    let unmounted = false;
    const q = query || localStorage.getItem("query");
    fetchData(`${SERVER_URL}/search/${q}/${initPage}`).then(res => {
      if (!unmounted) {
        setPost(
          res.data.result.map(item => {
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
        setTitle(q);
      }
      setFetching(false);
    });

    return () => {
      unmounted = true;
    };
  }, [query]);

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
        Search: {title}
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

const mapStateToProps = state => {
  return {
    query: state.userReducer.search
  };
};

export default connect(mapStateToProps, null)(SearchResultComponent);
