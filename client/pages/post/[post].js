import React, { useEffect, useState } from "react";
import PostLayout from "../../components/Post/PostLayout";
import Header from "../../components/Header/HeaderComponent";
import Banner from "../../components/Header/BannerComponent";
import Footer from "../../components/Layout/FooterComponent";
import ReadPostComponent from "../../components/Post/ReadPostComponent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../actions/userActions";
import { postData } from "../../libs/postData";

const ReadPost = ({ user, setUserDetail }) => {
  const [title, setTitle] = useState("");
  const [loginUser, setUser] = useState({});

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    const post_title = window.localStorage.getItem("post_title");
    let unmounted = false;
    if (!user) {
      postData("http://localhost:4000/check-token", { token }).then(res => {
        if (!unmounted) {
          if (res.fullname) {
            setUserDetail(res);
            setUser(res);
          } else return;
        }
        setTitle(post_title);
      });
    } else setUser(user);
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div>
      <Header title={title} />
      <Banner />
      <PostLayout user={loginUser} Right={<ReadPostComponent />} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ReadPost);
