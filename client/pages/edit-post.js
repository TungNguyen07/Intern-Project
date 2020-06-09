import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";

import RejectedPostEditor from "../components/Post/EditRejectedPostComponent";
import Layout from "../components/Post/PostLayout";
import Header from "../components/Header/HeaderComponent";
import Banner from "../components/Header/BannerComponent";
import Footer from "../components/Layout/FooterComponent";
import withAuth from "../auth/AuthHOC";
import Router from "next/router";
import { fetchData } from "../libs/fetchData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
}));

const EditPost = () => {
  const classes = useStyles();
  const [post, setPost] = useState({});
  const [postId, setPostId] = useState("");

  useEffect(() => {
    const path = Router.asPath;
    const id = path.split("=").pop();
    setPostId(id);
  }, []);

  useEffect(() => {
    if (postId) {
      let unmouted = false;

      fetchData(`${SERVER_URL}/post/get-post/${postId}`).then((res) => {
        if (res.data) {
          if (!unmouted) {
            setPost(res.data);
          }
        }
      });
      return () => {
        unmouted = true;
      };
    }
  }, [postId]);

  return (
    <div>
      <Header title="Edit post" />
      <Banner />
      {post ? (
        <Layout
          Right={
            <RejectedPostEditor title="Chỉnh sửa bài viết" edit_post={post} />
          }
        />
      ) : (
        <div className={classes.div}>
          <CircularProgress className={classes.loading} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default withAuth(EditPost);
