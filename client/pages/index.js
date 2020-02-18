import Header from "../components/Header/HeaderComponent";
import Footer from "../components/Layout/FooterComponent";
import Banner from "../components/Header/BannerComponent";
import Layout from "../components/Layout/LayoutComponent";
import Nav from "../components/Layout/NavbarComponent";
import Propaganda from "../components/Layout/PropagandaComponent";
import LatestPost from "../components/Post/LatestPostComponent";

import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Home" />
        <Banner />
        <Layout Left={<Nav />} Right={<Propaganda />} Center={<LatestPost />}>
          {" "}
        </Layout>
        <Footer />
      </div>
    );
  }
}

export default App;
