import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";

import ChangePasswordComponent from "../components/User/ChangePasswordComponent";
import Layout from "../components/Post/PostLayout";
import Header from "../components/Header/HeaderComponent";
import Banner from "../components/Header/BannerComponent";
import Footer from "../components/Layout/FooterComponent";
import withAuth from "../auth/AuthHOC";
import { userActions } from "../actions/userActions";
import { postData } from "../libs/postData";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const ChangePassword = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);

  return (
    <Grid>
      <Header title="Change password" />
      <Banner />
      <Layout Right={<ChangePasswordComponent />} />
      <Footer />
    </Grid>
  );
};

export default withAuth(ChangePassword);
