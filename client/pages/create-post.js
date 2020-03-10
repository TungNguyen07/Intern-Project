import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";

import PostEditor from "../components/Post/PostEditorComponent";
import Layout from "../components/Post/PostLayout";
import Header from "../components/Header/HeaderComponent";
import Banner from "../components/Header/BannerComponent";
import Footer from "../components/Layout/FooterComponent";
import withAuth from "../middlewares/AuthHOC";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const CreatePost = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return isLoading ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Header title="Create post" />
      <Banner />
      <Layout Right={<PostEditor />} />
      <Footer />
    </div>
  );
};

export default withAuth(CreatePost);
