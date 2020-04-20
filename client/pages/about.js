import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";

import AboutComponent from "../components/About/AboutComponent";
import Layout from "../components/Post/PostLayout";
import Header from "../components/Header/HeaderComponent";
import Banner from "../components/Header/BannerComponent";
import Footer from "../components/Layout/FooterComponent";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div>
      <Header title="About" />
      <Banner />
      <Layout Right={<AboutComponent />} />
      <Footer />
    </div>
  );
};

export default About;
