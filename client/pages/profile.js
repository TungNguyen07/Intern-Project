import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import ProfileLayout from "../components/User/ProfileLayout";
import ProfileComponent from "../components/User/ProfileComponent";
import UserPostComponent from "../components/User/UserPostComponent";
import Header from "../components/Header/HeaderComponent";
import Footer from "../components/Layout/FooterComponent";
import Banner from "../components/Header/BannerComponent";

const Profile = () => {
  return (
    <React.Fragment>
      <Header title="Profile" />
      <Banner />
      <ProfileLayout>
        <ProfileComponent />
        <UserPostComponent />
      </ProfileLayout>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
