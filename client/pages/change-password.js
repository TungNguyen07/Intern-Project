import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";

import ChangePasswordComponent from "../components/User/ChangePasswordComponent";
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

const ChangePassword = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      <Header title="Change password" />
      <Banner />
      <Layout Right={<ChangePasswordComponent />} />
      <Footer />
    </div>
  );
};

export default withAuth(ChangePassword);
