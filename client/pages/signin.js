import Header from "../components/Header/HeaderComponent";
import SigninComponent from "../components/User/SigninComponent";
import Footer from "../components/Layout/FooterComponent";
import Banner from "../components/Header/BannerComponent";
import { makeStyles } from "@material-ui/styles";
import { UserProvider } from "../contexts/userContext";

const useStyle = makeStyles(theme => ({}));

export default function Login() {
  const classes = useStyle();
  return (
    <UserProvider>
      {/* <Banner /> */}
      <Header title="Login" />
      <SigninComponent />
      <Footer />
    </UserProvider>
  );
}
