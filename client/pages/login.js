import Header from "../components/Header/HeaderComponent";
import LoginComponent from "../components/LoginComponent";
import Footer from "../components/FooterComponent";
import Layout from "../components/Layout/LayoutComponent";
import Banner from "../components/Header/BannerComponent";

export default function Login() {
  return (
    <div>
      {/* <Banner /> */}
      <Header />
      <LoginComponent />
      <Footer />
    </div>
  );
}
