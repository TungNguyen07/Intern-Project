import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from "@material-ui/lab/Pagination";

import { fetchData } from "../../libs/fetchData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
import { getPost } from "../../actions/postActions";
import CardPostItem from "./CardPostItemComponent";

const useStyles = makeStyles({
  postBox: {
    width: "80%",
    margin: "auto",
  },
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  pagination: {
    width: "fit-content",
    margin: "auto",
    paddingBottom: "0.5rem",
  },
});

export const ListApprovedPost = ({ user, getPost }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(1);

  useEffect(() => {
    let unmounted = false;
    if (user.id) {
      fetchData(`${SERVER_URL}/post/get-post-by-user/${user.id}/${page}`).then(
        (res) => {
          if (!unmounted) {
            setPost(
              res.data.post.map((item) => {
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
            setLength(res.data.length);
            setFetching(false);
          }
        }
      );
    }

    return () => {
      unmounted = true;
    };
  }, [user, page]);

  const handleChange = (event, pageClick) => {
    const post_block = document.getElementById("post_block");
    const view = post_block.offsetTop - 180;
    window.scroll({ top: view, behavior: "auto" });
    setPage(pageClick);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div id="post_block" className={classes.postBox}>
      {post.length ? (
        post.map((item, index) => {
          return <CardPostItem post={item} key={index} />;
        })
      ) : (
        <h4>Nothing found!</h4>
      )}
      <div className={classes.pagination}>
        <Pagination
          count={length}
          showFirstButton
          showLastButton
          onChange={handleChange}
          page={page}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: bindActionCreators(getPost, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListApprovedPost);
