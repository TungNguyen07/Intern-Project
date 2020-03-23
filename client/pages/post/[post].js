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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    postData("http://localhost:4000/check-token", { token })
      .then(res => {
        if (res.fullname) {
          setUserDetail(res);
          user = res;
        } else return;
      })
      .catch(err => {
        return err;
      });
    setLoading(false);
  }, []);

  return (
    <div>
      <Header title={"abc"} />
      <Banner />
      <PostLayout Right={<ReadPostComponent getTitle={setTitle} />} />
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
