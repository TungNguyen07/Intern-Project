import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

import Header from "../components/Header/HeaderComponent";
import Footer from "../components/Layout/FooterComponent";
import Banner from "../components/Header/BannerComponent";
import Layout from "../components/Layout/LayoutComponent";
import Nav from "../components/Layout/NavbarComponent";
import Propaganda from "../components/Layout/PropagandaComponent";
import LatestPost from "../components/Post/LatestPostComponent";
import ProfileNav from "../components/User/ProfileNavComponent";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

export const App = ({ user }) => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("user", user);
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
      <Layout
        Left={
          user.isSignedIn ? (
            <div>
              <Nav />
              <br />
              <ProfileNav />
            </div>
          ) : (
            <Nav />
          )
        }
        Right={<Propaganda />}
        Center={<LatestPost />}
      >
        {" "}
      </Layout>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps, null)(App);
