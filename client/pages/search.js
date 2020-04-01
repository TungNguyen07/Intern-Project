import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "../components/Header/HeaderComponent";
import Footer from "../components/Layout/FooterComponent";
import Banner from "../components/Header/BannerComponent";
import Layout from "../components/Layout/LayoutComponent";
import Nav from "../components/Layout/NavbarComponent";
import Propaganda from "../components/Layout/PropagandaComponent";
import ProfileNav from "../components/User/ProfileNavComponent";
import { userActions } from "../actions/userActions";
import { postData } from "../libs/postData";
import SearchComponent from "../components/Post/SearchResultComponent";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

export const Search = ({ user, setUserDetail }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    let unmounted = false;
    postData("http://localhost:4000/check-token", { token })
      .then(res => {
        if (!unmounted) {
          if (res.fullname) {
            setUserDetail(res);
            user = res;
          } else return;
        }
      })
      .catch(err => {
        return err;
      });
    setLoading(false);
    return () => {
      unmounted = true;
    };
  }, []);

  const handleGetText = text => {
    setKeyword(text);
  };

  return loading ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Header title="Home" />
      <Banner />
      <Layout
        Left={
          user.fullname ? (
            <div>
              <Nav />
              <br />
              <ProfileNav />
            </div>
          ) : (
            <Nav />
          )
        }
        Right={<Propaganda setQuery={handleGetText} />}
        Center={<SearchComponent query={keyword} />}
      >
        {" "}
      </Layout>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDetail: bindActionCreators(userActions.setUserDetail, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
