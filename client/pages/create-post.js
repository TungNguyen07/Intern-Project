import React from "react";
import PostEditor from "../components/Post/PostEditorComponent";
import Layout from "../components/Post/PostLayout";
import Header from "../components/Header/HeaderComponent";
import Banner from "../components/Header/BannerComponent";
import Footer from "../components/Layout/FooterComponent";

const CreatePost = () => {
  return (
    <div>
      <Header title="Create post" />
      <Banner />
      <Layout Right={<PostEditor />} />
      <Footer />
    </div>
  );
};

export default CreatePost;
