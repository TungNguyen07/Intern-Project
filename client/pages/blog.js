import BlogLayout from "../components/Blog/ReadBlogLayout";
import Header from "../components/Header/HeaderComponent";
import Banner from "../components/Header/BannerComponent";
import Footer from "../components/FooterComponent";

const LatestBlog = () => {
  return (
    <div>
      <Header title="abc" />
      <Banner />
      <BlogLayout />
      <Footer />
    </div>
  );
};

export default LatestBlog;
