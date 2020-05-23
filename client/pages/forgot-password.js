import Header from "../components/Header/HeaderComponent";
import ForgotPasswordComponent from "../components/User/ForgotPasswordComponent";
import Footer from "../components/Layout/FooterComponent";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({}));

export default function ForgotPassword() {
  const classes = useStyle();
  return (
    <React.Fragment>
      {/* <Banner /> */}
      <Header title="Forgot password" />
      <ForgotPasswordComponent />
      <Footer />
    </React.Fragment>
  );
}
