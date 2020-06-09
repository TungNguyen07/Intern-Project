import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, IconButton } from "@material-ui/core";
import Link from "next/link";

import { fetchData } from "../../libs/fetchData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
import CardPostNoURL from "./CardPostNoURLComponent";
import { deletePost } from "../../actions/postActions";
import AlertDialog from "../Dialog/AlertDialogComponent";

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
  cardBlock: {
    display: "flex",
  },
});

export const ListPendingPost = ({ user }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(1);
  const [alert, setAlert] = useState(false);
  const [alertResult, setAlertResult] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  const [target, setTarget] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    let unmounted = false;
    if (user.id) {
      fetchData(
        `${SERVER_URL}/post/get-pending-post-by-user/${user.id}/${page}`
      ).then((res) => {
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
      });
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

  const handleDelete = (item) => (event) => {
    setTitle(
      '<div>Bạn có chắc muốn</div><div style="background-color: #e7e7e7; margin-right: 4px; margin-left: 4px;font-weight: bold">XÓA</div><div>bài viết này</div>'
    );
    setTarget(item);
    setExpectedResult("DELETE_POST");
    setAlertResult("");
    setAlert(true);
  };

  useEffect(() => {
    if (alertResult == "DELETE_POST") {
      deletePost(target._id);
      const oldData = post;
      oldData.splice(oldData.indexOf(target), 1);
      setPost([...oldData]);
    }
    setTarget({});
    setTitle("");
    setExpectedResult("");
    setAlertResult("");
    setAlert(false);
  }, [alertResult]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div id="post_block" className={classes.postBox}>
      {post.length ? (
        post.map((item, index) => {
          return (
            <div className={classes.cardBlock} key={index}>
              <CardPostNoURL post={item} />
              <div>
                <Link href={`/edit-post`} as={`/edit-post?post_id=${item._id}`}>
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                </Link>
                <IconButton onClick={handleDelete(item)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </div>
            </div>
          );
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
      {alert && (
        <AlertDialog
          message={title}
          setDisplay={setAlert}
          btnOK={setAlertResult}
          expectedResult={expectedResult}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps, null)(ListPendingPost);
