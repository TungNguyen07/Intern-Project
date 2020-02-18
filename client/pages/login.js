import Header from "../components/Header/HeaderComponent";
import LoginComponent from "../components/User/LoginComponent";
import Footer from "../components/Layout/FooterComponent";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(theme => ({}));

export default function Login() {
  const classes = useStyle();
  return (
    <div>
      {/* <Banner /> */}
      <Header title="Login" />
      <LoginComponent />
      <Footer />
    </div>
  );
}
