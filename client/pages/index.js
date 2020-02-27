import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

import Header from "../components/Header/HeaderComponent";
import Footer from "../components/Layout/FooterComponent";
import Banner from "../components/Header/BannerComponent";
import Layout from "../components/Layout/LayoutComponent";
import Nav from "../components/Layout/NavbarComponent";
import Propaganda from "../components/Layout/PropagandaComponent";
import LatestPost from "../components/Post/LatestPostComponent";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const App = () => {
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
      <Header title="Home" />
      <Banner />
      <Layout Left={<Nav />} Right={<Propaganda />} Center={<LatestPost />}>
        {" "}
      </Layout>
      <Footer />
    </div>
  );
};

export default App;
