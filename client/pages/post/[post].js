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
import RelativePost from "../../components/Post/RelativePostComponent";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
import CommentComponent from "../../components/Comment/CommentComponent";

const ReadPost = ({ user, setUserDetail }) => {
  //const [loginUser, setUser] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    let unmounted = false;

    postData(`${SERVER_URL}/check-token`, { token }).then((res) => {
      if (!unmounted) {
        if (res.fullname) {
          setUserDetail(res);
        }
      }
    });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div>
      <Header title={title} />
      <Banner />
      <PostLayout Right={<ReadPostComponent setTitle={setTitle} />} />
      <CommentComponent />
      <RelativePost />

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetail: bindActionCreators(userActions.setUserDetail, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadPost);
