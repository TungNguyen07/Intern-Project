import LoginComponent from "../components/LoginComponent";
import Header from "../components/Header/HeaderComponent";
import Footer from "../components/FooterComponent";
import Banner from "../components/Header/BannerComponent";
import Layout from "../components/Layout/LayoutComponent";
import Nav from "../components/Layout/NavbarComponent";
import Propaganda from "../components/Layout/PropagandaComponent";
import LatestBlog from "../components/Blog/LatestBlogComponent";

import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Home" />
        <Banner />
        <Layout Left={<Nav />} Right={<Propaganda />} Center={<LatestBlog />}>
          {" "}
        </Layout>
        <Footer />
      </div>
    );
  }
}

export default App;
