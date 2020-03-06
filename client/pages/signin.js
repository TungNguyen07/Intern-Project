import Header from "../components/Header/HeaderComponent";
import SigninComponent from "../components/User/SigninComponent";
import Footer from "../components/Layout/FooterComponent";
import Banner from "../components/Header/BannerComponent";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(theme => ({}));

export default function Login() {
  const classes = useStyle();
  return (
    <React.Fragment>
      {/* <Banner /> */}
      <Header title="Login" />
      <SigninComponent />
      <Footer />
    </React.Fragment>
  );
}
