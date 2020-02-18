import PostLayout from "../components/Post/PostLayout";
import Header from "../components/Header/HeaderComponent";
import Banner from "../components/Header/BannerComponent";
import Footer from "../components/Layout/FooterComponent";

const LatestPost = () => {
  return (
    <div>
      <Header title="abc" />
      <Banner />
      <PostLayout />
      <Footer />
    </div>
  );
};

export default LatestPost;
